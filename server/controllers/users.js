const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//model
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.listUsers = async (req, res) => {
  try {
    // Code
    const user = await User.find({}).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.readUsers = async (req, res) => {
  try {
    // Code
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.updateUsers = async (req, res) => {
  try {
    // Code
    var { id, password } = req.body.values;
    // 1 gen salt
    const salt = await bcrypt.genSalt(10);
    // 2 encrypt
    var enPassword = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { _id: id },
      { password: enPassword }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.removeUsers = async (req, res) => {
  try {
    // Code
    const id = req.params.id;
    const user = await User.findOneAndDelete({ _id: id });
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.changeStatus = async (req, res) => {
  try {
    // Code
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { enabled: req.body.enabled }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.changeRole = async (req, res) => {
  try {
    // Code
    console.log(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.id },
      { role: req.body.role }
    );
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error!");
  }
};

exports.userCart = async (req, res) => {
  try {
    const { cart } = req.body;

    //Check user
    let user = await User.findOne({ username: req.user.username });

    //สร้าง array []
    let products = [];

    //check ตะกร้าสินค้าอันเก่า ถ้ามีสินค้าก้จะลบสินค้าที่มีอยู่
    let cartOld = await Cart.findOne({ orderBy: user._id }).exec();

    if (cartOld) {
      cartOld.remove();
      console.log("remover old cart");
    }

    //แต่งสินค้า
    for (let i = 0; i < cart.length; i++) {
      let object = {};

      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.price = cart[i].price;

      products.push(object);
    }
    //หาผลรวมของตะกร้า
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user._id,
    }).save();

    console.log(newCart);
    res.send("userCart");
  } catch (err) {
    console.log(err);
    res.status(500).send("userCart server Error!!");
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();
    let cart = await Cart.findOne({ orderBy: user._id })
      .populate("products.product", "_id title price")
      .exec();

    const { products, cartTotal } = cart;
    res.json({ products, cartTotal });
  } catch (err) {
    res.status(500).send("getUserCart Error");
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const userAddress = await User.findOneAndUpdate(
      { username: req.user.username },
      { address: req.body.address }
    ).exec();

    res.json({ ok: true });
  } catch (err) {
    res.status(500).send("save address Error");
  }
};

exports.saveOrder = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.user.username }).exec();

    let userCart = await Cart.findOne({ orderBy: user._id }).exec();

    let order = await new Order({
      products: userCart.products,
      orderBy: userCart.orderBy,
      cartTotal: userCart.cartTotal,
    }).save();

    // ตัดจำนวนสินค้า
    let bulkOption = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } }, //อัตเดตจำนวนสินค้า
        },
      };
    });

    let update = await Product.bulkWrite(bulkOption);

    res.send(update);
  } catch (err) {
    res.status(500).send("save address Error");
  }
};

//clear cart
exports.emptyCart = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username }).exec();

    const empty = await Cart.findOneAndRemove({ orderBy: user._id }).exec();

    res.send(empty);
  } catch (err) {
    res.status(500).send("Remove cart Error");
  }
};

exports.addToWishList = async (req, res) => {
  try {
    const { productId } = req.body;

    let user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $addToSet: { wishlist: productId } }
    ).exec();
      res.send(user)
  } catch (err) {
    res.status(500).send("addToWishList Error");
  }
};
exports.getWishList = async (req, res) => {
  try {
    let list = await User.findOne({ username: req.user.username })
      .select("wishlist")
      .populate("wishlist")
      .exec();
    res.json(list)
  } catch (err) {
    res.status(500).send("getToWishList Error");
  }
};

exports.removeWishList = async (req, res) => {
  try {
    const { productId } = req.params;
    let user = await User.findOneAndUpdate(
      { username: req.user.username },
      { $pull: { wishlist: productId } }
    ).exec();
    res.send(user)
  } catch (err) {
    res.status(500).send("getToWishList Error");
  }
};

exports.getOrder = async (req, res) => {
  try {
    const user =await User.findOne({username:req.user.username})

    let order = await Order.find({orderBy:user._id})
      .populate("products.product")
      .exec()

    res.json(order)
  } catch (err) {
    res.status(500).send("getOrder Error");
  }
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//model
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

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

      products.push(object)
    }
    //หาผลรวมของตะกร้า
    let cartTotal = 0
    for(let i=0 ; i < products.length ;i++){
      cartTotal = cartTotal + products[i].price * products[i].count

    }

    let newCart = await new Cart({
      products,
      cartTotal,
      orderBy: user._id
    }).save()

    console.log(newCart);
    res.send("userCart");
  } catch (err) {
    console.log(err);
    res.status(500).send("userCart server Error!!");
  }
};

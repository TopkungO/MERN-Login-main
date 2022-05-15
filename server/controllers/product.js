const Product = require("../models/Product");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const product = await new Product(req.body).save();
    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product Faile!!");
  }
};

exports.list = async (req, res) => {
  try {
    const count = parseInt(req.params.count);
    const product = await Product.find()
      .limit(count) //กำหนดข้อมูล
      .populate("category") //เชื่อมtable
      .sort([["createdAt", "desc"]]); //จัดลำดับข้อมูล
    res.send(product);
  } catch (err) {
    res.status(500).send("Create Product Faile!!");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      _id: req.params.id,
    }).exec();
    res.send(deleted);
  } catch (err) {
    res.status(500).send("Create Product Faile!!");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id })
      .populate("category")
      .exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Read Product ERROR!!");
  }
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    ).exec();
    res.send(product);
  } catch (err) {
    res.status(500).send("Update Product Error!!");
  }
};

exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;

    const product = await Product.find()
      .limit(limit) //กำหนดข้อมูล
      .populate("category") //เชื่อมtable
      .sort([[sort, order]]);
    //จัดลำดับข้อมูล
    res.send(product);
  } catch (err) {
    res.status(500).send("ListBy Product Faile!!");
  }
};

const handleQuery = async (req, res, query) => {
  let products = await Product.find({ $text: { $search: query } })
  .populate("category","_id name");

  res.send(products);
};

const handlePrice = async (req, res, price) => {
  let products = await Product.find({
    price:{
      $gte:price[0],
      $lte:price[1]
    }
  })
  .populate("category","_id name");

  res.send(products);
};

const handleCategory = async (req, res, category) => {
  let products = await Product.find({category})
  .populate("category","_id name");

  res.send(products);
};

exports.searchFilter = async (req, res) => {
  const { query,price,category } = req.body;

  //ค้นหาด้วยtext
  if (query) {
    console.log("query--->",query);

    await handleQuery(req, res, query);
  }
  //ค้นหาด้วยราคา [0,200]
  if (price !== undefined) {
    console.log("price--->",price);
    await handlePrice(req, res, price);
  }
  //ค้นหาด้วยหมวดหมู่ [_id]
  if (category) {
    console.log("category--->",category);
    await handleCategory(req, res, category);
  }

};

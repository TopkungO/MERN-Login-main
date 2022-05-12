const Category = require("../models/Category");

exports.listCategory = async (req, res) => {
  try {
    const category = await Category.find({}).exec();

    res.send(category);
  } catch (err) {
    res.status(500).send("server Error");
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name }).save();
    res.send(category);
  } catch (err) {
    res.status(500).send("server Error");
  }
};

exports.readCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOne({ _id: id });
    res.send(category);
  } catch (err) {
    res.status(500).send("server Error");
  }
};
exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const category = await Category.findOneAndUpdate({ _id: id}, {name: name });

    res.send(category);
    console.log(res);
  } catch (err) {
    res.status(500).send("server Error");
  }
};
exports.removeCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findOneAndRemove({ _id: id });
    
    res.send(category);
  } catch (err) {
    res.status(500).send("server Error");
  }
};

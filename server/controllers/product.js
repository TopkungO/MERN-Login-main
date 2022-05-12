const Product = require("../models/Product")

exports.create = async (req, res) => {
    try{
        console.log(req.body);
        const product =await new Product(req.body).save()
        res.send(product)
    }catch(err){
        res.status(500).send("Create Product Faile!!")
    }
};

exports.list= async (req, res) => {
    try{
        const count = parseInt(req.params.count)
        const product = await Product.find()
            .limit(count)   //กำหนดข้อมูล
            .populate('category')  //เชื่อมtable
            .sort([["createdAt","desc"]]) //จัดลำดับข้อมูล
        res.send(product)
    }catch(err){
        res.status(500).send("Create Product Faile!!")
    }
};

exports.remove = async (req, res) => {
    try{
        const deleted = await Product.findOneAndRemove({_id:req.params.id}).exec()
        res.send(deleted)
    }catch(err){
        res.status(500).send("Create Product Faile!!")
    }
};

exports.read = async (req, res) => {
    try{
        const product = await Product
            .findOne({_id:req.params.id})
            .populate("category")
            .exec()
        res.send(product)
    }catch(err){
        res.status(500).send("Read Product ERROR!!")
    }
};

exports.update = async (req, res) => {
    try{
        const product =await Product
            .findOneAndUpdate({_id:req.params.id},req.body,{new:true})
            .exec()
        res.send(product)
    }catch(err){
        res.status(500).send("Update Product Error!!")
    }
};
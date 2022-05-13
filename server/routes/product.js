const express =require('express')
const router = express.Router()

//controller
const {create,remove,list,read,update,listBy} = require("../controllers/product")
//middleware 
const{ auth ,adminCheck} =require('../middleware/auth')

//@Endpoint http://localhost:5000/api/product
//@method   POST
router.post("/product",auth ,adminCheck,create)
//@method   GEt
router.get("/product/:count",list)
//@method   DELETE
router.delete("/product/:id",auth ,adminCheck,remove)

//update
//@Endpoint http://localhost:5000/api/products
//@method   get
router.get("/products/:id",read)
router.put("/products/:id",auth ,adminCheck,update)


router.post("/productsby",listBy)




module.exports = router
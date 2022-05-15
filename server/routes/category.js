const express =require('express')
const { createCategory, readCategory, updateCategory, removeCategory, listCategory } = require('../controllers/category')
const router = express.Router()

//middleware 
const{ auth ,adminCheck} =require('../middleware/auth')

//@Endpoint http://localhost:5000/api/category
//@method   GET
router.get("/category",listCategory)
//@method   POST
router.post("/category",auth ,adminCheck,createCategory)
//@method   GET
router.get("/category/:id",auth ,adminCheck,readCategory)
//@method   PUT
router.put("/category/:id",auth ,adminCheck,updateCategory)
//@method   DELETE
router.delete("/category/:id",auth ,adminCheck,removeCategory)

module.exports = router
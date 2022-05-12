const express =require('express')
const router = express.Router()

//controller
const {createImages,removeImages} =require("../controllers/cloudinary")

//middleware 
const{ auth ,adminCheck} =require('../middleware/auth')

//@Endpoint http://localhost:5000/api/images
router.post("/images",auth ,adminCheck,createImages)
router.post("/removeimages",auth ,adminCheck,removeImages)

module.exports = router
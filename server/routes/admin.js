const express = require("express");
const router = express.Router();

// middleware
const { auth, adminCheck } = require("../middleware/auth");

//controller
const {changeOrderStatus,getOrderAdmin} = require("../controllers/admin")

//@Endpoint  http://localhost:5000/api/admin/order-status
//@Method    PUT/GET
router.put("/admin/order-status", auth,adminCheck,changeOrderStatus);
router.get("/admin/orders", auth,adminCheck,getOrderAdmin);

module.exports = router;

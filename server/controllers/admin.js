const Order = require("../models/Order");

exports.changeOrderStatus = async (req, res) => {
  try {
    const { orderId,orderStatus} = req.body
    console.log(orderStatus);
    let orderUpdate = await Order.findByIdAndUpdate(
        orderId,
        {orderStatus},
        {new:true}
    )
    res.send(orderUpdate)

  } catch (err) {
    res.status(500).send("changeOrderStatus Faile!!");
  }
};

exports.getOrderAdmin = async (req, res) => {
  try {

    let order = await Order.find()
      .populate("products.product")
      .populate("orderBy","username")
      .exec()

    res.json(order)
  } catch (err) {
    res.status(500).send("getOrder Error");
  }
};

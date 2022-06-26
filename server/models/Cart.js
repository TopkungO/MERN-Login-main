const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const CartSchema = new mongoose.Schema(
  {
    products:[ //รายการสินค้า

      {
        product:{ 
          type:ObjectId,
          ref:"product"
        },
        count:Number,
        price:Number,

      }

    ],
    cartTotal:Number, //ผลรวมราคา
    orderBy:{ //เจ้าของตะกร้าสินค้า
      type:ObjectId,
      ref:"users"
    }

  },
  { timestamps: true }
);
module.exports = Cart = mongoose.model("cart", CartSchema);

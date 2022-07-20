const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


const OrderSchema = new mongoose.Schema(
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
    orderStatus:{
      type:String,
      default:'Not Process'
    },
    orderBy:{ //เจ้าของตะกร้าสินค้า
      type:ObjectId,
      ref:"users"
    }

  },
  { timestamps: true }
);
module.exports = Order = mongoose.model("order", OrderSchema);

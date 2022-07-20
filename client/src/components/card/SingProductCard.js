import React from "react";

import { Card, Tabs } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import { useSelector, useDispatch } from "react-redux";
//lodash
import _ from "lodash";
//function
import { addToWishList } from "../functions/users";

import { toast } from "react-toastify";

const { TabPane } = Tabs;

const SingProductCard = ({ product }) => {
  const { _id, title, description, images, price, quantity, sold, category } =
    product;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const handleAddToCart = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...product,
      count: 1,
    });

    let unique = _.uniqWith(cart, _.isEqual);
    localStorage.setItem("cart", JSON.stringify(unique));

    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });

    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };

  const handleAddToWishList =(e)=>{
    if(user){
      addToWishList(user.token,_id)
      .then(res=>{
        console.log(res);
        toast.success("Add to wishlist Success")
      })
      .catch(err=>{
        console.log(err);
      })
    }else{
      toast.error("please login")
    }
    
  }
  return (
    <>
      <div className="col-md-7">
        <Carousel autoPlay showArrows={true} infiniteLoop>
          {images &&
            images.map((item) => <img src={item.url} key={item.public_id} alt="รูปสินค้า"/>)}
        </Carousel>

        <Tabs>
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="More..." key="2">
            More...
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <a onClick={handleAddToWishList}>
              <HeartOutlined className="text-info" />
              <br />
              Add to wishlist
            </a>,
            
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                Add to Cart
              </a>
            
          ]}
        >
          <ul className="list-group list-group-flush">
            {category && (
              <li className="list-group-item">
                category <span className="float-end">{category.name}</span>
              </li>
            )}

            <li className="list-group-item">
              Price <span className="float-end">{price}</span>
            </li>
            <li className="list-group-item">
              quantity <span className="float-end">{quantity}</span>
            </li>
            <li className="list-group-item">
              Sold <span className="float-end">{sold}</span>
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
};

export default SingProductCard;

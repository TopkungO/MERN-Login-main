import React from "react";

import { Card } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const SingProductCard = ({ product }) => {
  const { _id, title, description, images, price, quantity, sold } = product;
  return (
    <>
      <div className="col-md-7">image</div>
      <div className="col-md-5">
        <Card
          actions={[
            <Link to={"/"}>
              <HeartOutlined className="text-info" />
              <br />
              Add to wishlist
            </Link>,
            <>
              <ShoppingCartOutlined className="text-danger" />
              <br />
              Add to Cart
            </>,
          ]}
        >
          <Meta title={title} description={description} />
          <p>
              detail
          </p>
        </Card>
      </div>
    </>
  );
};

export default SingProductCard;

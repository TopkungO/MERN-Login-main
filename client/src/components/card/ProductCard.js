import React from "react";

import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";


const { Meta } = Card;

const ProductCard = ({product}) => {
  const {_id,title, description, images } = product;

  return (
    <Card
      hoverable
      cover={
        <img
            className="p-2"
            style={{height:"150px",objectFit: "cover"}}
            alt="example"
            src={images && images.length 
                    ? images[0].url
                    : ""
        }
        />
      }
      actions={[
        <Link to={"/product/"+_id}>
          <EyeOutlined className="text-warning" />
        </Link>
        ,
        <ShoppingCartOutlined 
          className="text-danger" 
        //   onClick={()=>handleRemove(_id)}
        />
      ]}
    >
        
      <Meta title={title} description={description} />

    </Card>
  );
};

export default ProductCard;

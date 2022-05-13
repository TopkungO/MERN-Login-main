import React, { useState, useEffect } from "react";
//function
import { readProduct } from "../functions/product";

import { useParams } from "react-router-dom";
import SingProductCard from "../card/SingProductCard";

const Product = () => {

  const params = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    loadData()
  }, []);

  const loadData =()=>{
    readProduct(params.id)
        .then(res=>{
            setProduct(res.data);
        }).catch(err=>{
            console.log(err.response.data)
        })
  }

  return (
    <div className="container-fluid">
        <div className="row pt-4">
            <SingProductCard product={product}/>
        </div>
        <div className="row" >
 
        </div>
    </div>
    )
};

export default Product;

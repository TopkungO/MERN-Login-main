import React, { useState, useEffect } from "react";
import ProductCard from "../card/ProductCard";
import LoadingCard from "../card/LoadingCard"

//function
import { listProductBy } from "../functions/product";

const NewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("createdAt", "desc", 3)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3}/>
        ) : (
          <div className="row">
            {product.map((item, index) => (
              <div className="col-md-4">
                <ProductCard key={index} product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default NewProduct;

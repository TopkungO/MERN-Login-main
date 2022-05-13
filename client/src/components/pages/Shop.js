import React, { useState, useEffect } from "react";
import { useSeletor, useDispatch } from "react-redux";
import ProductCart from "../card/ProductCard";
//function
import { listProduct } from "../functions/product";

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoadind] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoadind(true);
    listProduct(12)
      .then((res) => {
        setProduct(res.data);
        setLoadind(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadind(false);
      });
  };
  return (
    <>
      <div className="container-fluid">
          <div className="row">
              <div className="col-md-3">filter/Search</div>
              <div className="col-md-9">
                  {loading 
                    ? <h4 className="text-danger">Loadin...</h4>
                    :   <h4 className="text-info">product</h4>
                    }

                    {product.length <1 && <p>no Product found</p>}
                    <div className="row pb-5">
                        {product.map((item,index)=> 
                            <div key={index} className="col-md-4 mt-3">
                                <ProductCart product={item}/>
                            </div>
                        )}
                    </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default Shop;

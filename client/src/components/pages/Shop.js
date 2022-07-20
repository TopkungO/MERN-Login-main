import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCart from "../card/ProductCard";
//function
import { listProduct, searchFilter } from "../functions/product";
import { listCategory } from "../functions/category";
//antd
import { Slider, Checkbox } from "antd";

const Shop = () => {

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  //??----------------State-------------------------------
  const [product, setProduct] = useState([]);
  const [loading, setLoadind] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  //category
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategoeySelect] = useState([]);

  //todo:-------------------------------------------
  //1.load all data
  useEffect(() => {
    loadData();
    listCategory().then((res) => setCategory(res.data));
  }, []);

  //2.load data on user filter
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilter({ query: text });
      if (!text) {
        loadData();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);

  //3.load on slider
  useEffect(() => {

    fetchDataFilter({ price });
  }, [ok]);

//!! ----------------------------------------------
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

  //
  const handlePrice = (value) => {
    setPrice(value);
    //ตั้งdelayเวลาในการเปลี่ยนแปลง
    setTimeout(() => {
      setOk(!ok);
    }, 300);

  };

  //filter
  const fetchDataFilter = (arg) => {
    searchFilter(arg)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //กดCheckbox
  const handleCheck = (e) => {
    //ค่าปัจจุบันที่ check
    let inCheck = e.target.value;
    //ต่าเดิมของ check
    let inState = [...categorySelect];

    let findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategoeySelect(inState);
    fetchDataFilter({ category: inState });
    if (inState.length < 1) {
      loadData();
    }
  };


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            filter/Search
            <hr />
            <h4>ค้นหาด้วยราคา</h4>
            <Slider range max={20000} onChange={handlePrice} value={price} />
            <hr />
            <h4>ค้นหาตามหวดหมู่สินค้า</h4>
            {category.map((item, index) => (
              <Checkbox value={item._id} onChange={handleCheck}>
                {item.name}
              </Checkbox>
            ))}
          </div>
          <div className="col-md-9">
            {loading ? (
              <h4 className="text-danger">Loadin...</h4>
            ) : (
              <h4 className="text-info">product</h4>
            )}

            {product.length < 1 && <p>no Product found</p>}
            <div className="row pb-5">
              {product.map((item, index) => (
                <div key={index} className="col-md-4 mt-3">
                  <ProductCart product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//function
import {
  getUserCart,
  saveAddress,
  saveOrder,
  emptyCart,
} from "../functions/users";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CheckOut = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch =useDispatch();
  const navigate = useNavigate();
  
  //state
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log(res.data);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);


  const handleSaveAddress = () => {
    console.log(address);
    saveAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        toast.success("address Saved");
        setAddressSaved(true);
      }
    });
  };

  const handleCreateOrder = () => {
    saveOrder(user.token)
      .then((res) => {
        console.log(res);
        emptyCart(user.token) //clear DB
        toast.success('Buy product success ')
        //clear store
        dispatch({
          type:'ADD_TO_CART',
          payload: []
        })
        //clear localstorege
        if(typeof window !== "undefined") localStorage.removeItem("cart")
        navigate("/user/history")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h4>Address</h4>
          <ReactQuill value={address} onChange={setAddress} />
          <button className="btn btn-primary m-2" onClick={handleSaveAddress}>
            SaveAddress
          </button>
        </div>
        <div className="col-md-6">
          <h4>order Summary</h4>
          <hr />
          <p>จำนวนสินค้า {products.length}</p>
          <p>List Product</p>
          {products.map((item, i) => (
            <div key={i}>
              <p>
                {item.product.title} X {item.count} = {item.price * item.count}
              </p>
            </div>
          ))}
          <hr />
          <p>
            Total : <b>{total}</b>
          </p>
          <br />
          <button
            className="btn btn-primary"
            disabled={!addressSaved || !products.length}
            onClick={handleCreateOrder}
          >
            CheckOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

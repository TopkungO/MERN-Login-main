/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getWishList, removeWishList } from "../../functions/users";
import { Link } from "react-router-dom";

import MenubarUser from "../../layouts/MenubarUser";

const Wishlist = () => {
  const [wishList, setWishList] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getWishList(user.token).then((res) => {
      setWishList(res.data.wishlist);
    });
  };
  const handleRemove = (productId) => {
    removeWishList(user.token, productId).then((res) => {
      console.log(res.data);
      loadData();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col">
          <div className="row">
            wishList
            {wishList.map((item, index) => (
              <div key={index} className="alert alert-secondary">
                <Link to={"/product/"+item._id}>
                  {item.title}
                  <span
                    style={{ float: "right" }}
                    onClick={() => handleRemove(item._id)}
                  >
                    ลบ
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

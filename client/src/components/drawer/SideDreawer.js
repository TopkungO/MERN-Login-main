import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Button, Drawer } from "antd";

const SideDreawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));

  const onCloseDrawer = () => {
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
  };

  return (
    <Drawer
      title={"cart" + cart.length + " product"}
      placement="right"
      visible={drawer}
      onClose={onCloseDrawer}
    >
      {cart.map((item) => (
        <div className="row">
          <div className="col">
            <img
              src={item.images[0].url}
              style={{ width: "100%", height: "100px", ObjectFit: "cover" }}
            />
            <p className="text-center bg-secondary text-light">
              {item.title} X {item.count}
            </p>
          </div>
        </div>
      ))}
      <Link to="/cart">
        <button 
          className="text-center btn btn-primary"
          onClick={onCloseDrawer}
        >GotoCart</button>
      </Link>
    </Drawer>
  );
};

export default SideDreawer;

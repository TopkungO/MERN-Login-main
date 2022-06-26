import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductTableInCart from "../card/ProductTableInCart";
import { useNavigate } from "react-router-dom";

//function
import { userCart } from "../functions/users";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currenValue, nextValue) => {
      return currenValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const handleSaveOrder = () => {
    alert("checkOut Order");

    userCart(user.token, cart)
      .then((res) => {
        console.log(res);
        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
      });
      
  };
  const showCartItem = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <td>Image</td>
          <td>Title</td>
          <td>Price</td>
          <td>Count</td>
          <td>Remove</td>
        </tr>
      </thead>
      {cart.map((item) => (
        <ProductTableInCart key={item._id} item={item} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          Cart {cart.length} producet
          {!cart.length ? <p>No product in cart</p> : showCartItem()}
        </div>
        <div className="col-md-4">
          <h4>
            summary
            <hr />
          </h4>
          {cart.map((item, index) => (
            <p key={index}>
              {item.title} X {item.count} = {item.price * item.count}
            </p>
          ))}
          <hr />
          Total: <b>{getTotal()}</b>
          <hr />
          {user ? (
            <button
              className="btn btn-success"
              disabled={!cart.length}
              onClick={handleSaveOrder}
            >
              check Out
            </button>
          ) : (
            <button className="btn btn-danger">
              <Link to="/login" state="cart">
                login to check Out
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

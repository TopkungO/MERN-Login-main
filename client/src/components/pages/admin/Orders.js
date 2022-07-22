import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
//function
import { updateStatusOrder,getOrderAdmin } from "../../functions/admin";


import {toast} from "react-toastify"
const Orders = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrderAdmin(user.token).then((res) => {
      setOrders(res.data);
      
    });
  };
  const handleChangeStatus = (orderId,orderStatus) =>{
    updateStatusOrder(user.token,orderId,orderStatus)
      .then(res=>{
        toast.info("Update" +res.data.orderStatus + "success")
        loadData()
      })
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col text-center">
          {orders.map((item, index) => {
            return (
              <div className="card m-3" key={index}>
                <p>order By: {item.orderBy.username}</p>
                <p>status: {item.orderStatus}</p>
                
                {/* Select */}
                <select
                  className="form form-control m-1"
                  style={{ width: "200px", alignSelf: "center" }}
                  onChange={(e)=>handleChangeStatus(item._id,e.target.value)}
                  value={item.orderStatus}
                >
                  <option value="Not Process">Not Process</option>
                  <option value="processing">Processing</option>
                  <option value="cancelled">cancelled</option>
                  <option value="completed">Completed</option>
                </select>
                {/*table*/}
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <td>title</td>
                      <td>price</td>
                      <td>count</td>
                    </tr>
                  </thead>
                  {/* loop table */}
                  <tbody>
                    {item.products.map((p, i) => (
                      <tr>
                        <td>{p.product.title}</td>
                        <td>{p.price}</td>
                        <td>{p.count}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3}>
                        {" "}
                        ราคาสุทธิ:
                        <b>
                          <u>
                            <i>{item.cartTotal}</i>
                          </u>
                        </b>
                      </td>
                    </tr>
                  </tbody>

                  {/*table*/}
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;

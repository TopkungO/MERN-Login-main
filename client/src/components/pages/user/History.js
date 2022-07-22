import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import MenubarUser from "../../layouts/MenubarUser";
import { getOrder } from "../../functions/users";

//pdf
import { PDFDownloadLink } from "@react-pdf/renderer";

import Invoice from "../../order/Invoice";
import InvoicePDFJS from "../../order/InvoicePDFJS";
const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrder(user.token).then((res) => {
      setOrders(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col text-center">
          <div className="row">
            History
            {/* loop order card */}
            {orders.map((item, index) => {
              console.log(item);
              return (
                <div className="card m-3" key={index}>
                  <p>status: {" " + item.orderStatus}</p>
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
                  {/* PDF */}
                  <div className="row">
                    <div className="col">
                      <PDFDownloadLink
                        document={<Invoice order={item} />}
                        className="btn btn-primary m-1"
                        fileName="invoice.pdf"
                      >
                        Download
                      </PDFDownloadLink>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <InvoicePDFJS order={item}/>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

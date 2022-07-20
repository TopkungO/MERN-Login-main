import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import MenubarUser from "../../layouts/MenubarUser";
import { getOrder } from "../../functions/users";

//pdf
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
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
                  <p>order{" " + item.orderstatus}</p>
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
                  <div className="row">
                    <div className="col">
                      <PDFDownloadLink
                        document={
                          <Document>
                            <Page size="A4" style={styles.page}>
                              <View style={styles.section}>
                                <Text>Section #1</Text>
                              </View>
                              <View style={styles.section}>
                                <Text>Section #2</Text>
                              </View>
                            </Page>
                          </Document>
                        }
                        className="btn btn-primary m-1"
                        fileName="invoice.pdf"
                      >
                        Download
                      </PDFDownloadLink>
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

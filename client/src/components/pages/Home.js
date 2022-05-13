import React from "react";
import NewProduct from "../home/NewProduct";
import BastSeller from "../home/BastSeller";

const Home = () => {

  return (
    <div>
      {/* new product */}
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        สินค้ามาใหม่
      </h4>
      <NewProduct/>

      {/* Bast seller */}
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        สินค้าขายดี
      </h4>
      <BastSeller/>
    </div>
  );
};

export default Home;

import React from "react";

import MenubarUser from "../../layouts/MenubarUser";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col">
          <div className="row">
            user
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;

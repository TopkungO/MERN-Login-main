import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import {useSelector} from "react-redux"
//function
import { listProduct,removeProduct } from "../../functions/product";

//page
import AdminProductCard from "../../card/AdminProductCard";

//notify
import {toast} from "react-toastify"
const Home = () => {
  const {user} = useSelector((state)=>({...state}))
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData(100);
  }, []);

  const loadData = (count) => {
    setLoading(true);
    listProduct(count)
      .then((res) => {
        setLoading(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleRemove = (id)=>{
    if(window.confirm("DELETE ??")){
      removeProduct(user.token,id)
        .then(res=>{
          loadData(100)
          toast.success("Deleted "+res.data.title +" success!!")
        }).catch(err=>{
          toast.error("Remove ERROR")
          console.log(err)
        })
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          {loading ? <h1>loading</h1> : <h1>home admin</h1>}

          <div className="row">
            {product.map((item) => (
              <div key={item._id} className="col-md-4 pb-2">
                <AdminProductCard 
                  product={item} 
                  handleRemove={handleRemove}
                  />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;

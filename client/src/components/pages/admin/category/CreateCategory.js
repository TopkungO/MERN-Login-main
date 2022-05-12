import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


import MenubarAdmin from "../../../layouts/MenubarAdmin";

//function
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../../functions/category";

//redux
import {useSelector} from "react-redux"

const CreateCategory = () => {
  const {user} = useSelector((state)=>({...state}))

  const [value, setValue] = useState({ name: "" });
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (id)=>{

    deleteCategory(user.token,id)
    .then((res) => {
      console.log(res);
      toast.success("Remove data "+res.data.name+" success!!!")
      loadData(user.token);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error!!! Remove Data")
    });

  }


  const handleChangeCategory = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createCategory(user.token,value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
        toast.success("Insert data "+res.data.name+" success!!!")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error!!! insert Data")
      });
    
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>CreateCategory</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>เพิ่มหมวดหมู่สินค้า</label>
              <input
                type="text"
                name="name"
                value={value.name}
                className="form-control m-2"
                onChange={handleChangeCategory}
              />
              <button className="btn btn-outline-primary">เพิ่ม</button>
            </div>
          </form>
        </div>
        <hr />

        <ul className="list-group">
          {category.map((item,index) => (
            <li
              className="list-group-item" 
              key={index}
              
              >
              {item.name}
              <span 
                style={{float:"right"}}
                className="badge bg-primary rounded-pill" 
                onClick={()=> handleRemove(item._id)}
              >
                X
              </span>
              <span 
                style={{float:"right"}}
                className="badge bg-primary rounded-pill" 

              >
                <Link to={`/admin/update-category/${item._id}`}>Edit</Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateCategory;

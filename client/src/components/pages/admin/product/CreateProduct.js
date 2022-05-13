import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../../layouts/MenubarAdmin";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Spin } from 'antd';

//function
import { createProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";
import FileUpload from "./FileUpload";

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading,setLoading] =useState(false)


  useEffect(() => {
    loaddata(user.token);
  }, []);

  const loaddata = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setValues({ ...values, categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
      .then((res) => {
        toast.success("insert data: " + res.data.title);
        console.log(res);
        window.location.reload()
      })
      .catch((err) => {
        toast.error(err.response.data);
        console.log(err.response);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          
          {loading
            ? <Spin tip="Loading..."/>
            : <h1>CreateProduct</h1>
          }
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>price</label>
              <input
                className="form-control"
                type="number"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>quantity</label>
              <input
                className="form-control"
                type="number"
                name="quantity"
                value={values.quantity}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-control"
                name="category"
                onChange={handleChange}
              >
                <option>Plese Select</option>
                {values.categories.length > 0 &&
                  values.categories.map((item) => 
                    <option 
                      key={item._id} 
                      value={item._id}
                    >
                      {item.name}
                    </option>)
                
                }
              </select>
            </div>
            
            <FileUpload 
              values={values} 
              setValues={setValues} 
              loading={loading}
              setLoading={setLoading}
            />
            <br/>
            <button className="btn btn-primary">submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;

import React from "react";
// Page
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";

// Layout
import Navbar from "./components/layouts/Navbar";

// V.6
import { Routes, Route } from "react-router-dom";

// pages admin
import HomeAdmin from "./components/pages/admin/Home";
import ManageAdmin from "./components/pages/admin/ManageAdmin";
import CreateCategory from "./components/pages/admin/category/CreateCategory";
import UpdateCategory from "./components/pages/admin/category/UpdateCategory";
import CreateProduct from "./components/pages/admin/product/CreateProduct";
import UpdateProduct from "./components/pages/admin/product/UpdateProduct";

// pages user
import HomeUser from "./components/pages/user/Home";
import Product from "./components/pages/Product"
import Shop from "./components/pages/Shop"
// functions
import { currentUser } from "./components/functions/auth";
// redux
import { useDispatch } from "react-redux";

// Routes
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        //code
        console.log(res.data);
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        //err
        console.log(err);
      });
  }

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop" element={<Shop />} />

        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/update-category/:id"
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/create-product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/update-product/:id"
          element={
            <AdminRoute>
              <UpdateProduct/>
            </AdminRoute>
          }
        />

        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

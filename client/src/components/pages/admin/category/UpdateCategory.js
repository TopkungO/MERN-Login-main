import React,{useState,useEffect} from 'react'
import MenubarAdmin from '../../../layouts/MenubarAdmin'

//redux
import {useSelector} from "react-redux"

//function
import {readCategory,editCategory} from "../../../functions/category"

import { useParams,useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"

const UpdateCategory = () => {

  const {user} = useSelector((state)=>({...state}))
  const navigete =useNavigate();
  const param =useParams();

  const [name,setName] =useState("")

  useEffect(()=>{
    loadData(user.token,param.id)
  },[])

  const loadData =(authtoken,id)=>{
    readCategory(authtoken,id)
      .then(res=>{
        setName(res.data.name);
      }).catch(err=>{
        console.log(err);
      })
  }

  const handleSubmit = (e)=>{

    e.preventDefault();

    editCategory(user.token,param.id,{name})
      .then(res=>{
        navigete('/admin/create-category')
        toast.success("update "+res.data.name + " success!!")
      }).catch(err=>{
        console.log(err);
      })
    
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>updateCategory</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>แก้ไขหมวดหมู่สินค้า</label>
              <input
                className="form-control m-2"
                type="text"
                name="name"
                value={name}
                autoFocus
                required
                onChange={(e)=> setName(e.target.value)}
              />
              <button className="btn btn-outline-success">แก้ไข</button>
            </div>
          </form>
          
          

        
      </div>
    </div>
    </div>
  )
}

export default UpdateCategory
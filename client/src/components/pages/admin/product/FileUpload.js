import React from 'react'
import Resize from "react-image-file-resizer";
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Avatar, Badge } from 'antd';

const FileUpload = ({values,setValues,loading,setLoading}) => {

    const {user} =useSelector((state)=>({...state}))

    const handleChangeFile = (e)=>{
      const files =e.target.files;
      if(files){

        setLoading(true)

        let allfileUpload = values.images

        for(let i=0;i<files.length;i++){
           Resize.imageFileResizer(
               files[i],
               720,
               720,
               "JPEG",
               100,
               0,
               (uri)=>{
               axios.post(process.env.REACT_APP_API + "/images",
                {
                    image:uri
                },
                {
                    headers:{
                        authtoken: user.token
                    }
                }).then(res=>{

                    allfileUpload.push(res.data)
                    setValues({...values,images:allfileUpload})
                    setLoading(false)
                    
                }).catch(err=>{
                    console.log(err);
                    setLoading(false)
                })
               },
               "base64"
           )
       }
      }
    }

    const handleRemove =(public_id)=>{
        console.log(public_id);
        setLoading(true)
        const {images} =values
        console.log("img",images);
        axios.post(process.env.REACT_APP_API + "/removeimages",
            {public_id},
            {
                headers:{
                    authtoken:user.token
                }
            }).then(res=>{
                setLoading(false)
                let filterImages =images.filter(item=>{
                   return item.public_id !== public_id
                })
                setValues({...values,images:filterImages})
                console.log(filterImages);
            }).catch(err=>{
                setLoading(false)

                console.log(err);
            })
    }
  return (
    <>
    <br/>
    {values.images && values.images.map(item=>
        
        <span className="avatar-item">
            <Badge 
                count="X"
                style={{cursor:'pointer'}}
                onClick={()=>handleRemove(item.public_id)}
            >
                <Avatar 
                    src={item.url} 
                    shape="square" 
                    size={120}
                    className="m-3"
                />
            </Badge>
        </span>

    )}

    <hr/>
    <div className="form-group">
      <label className='btn btn-primary'>
        choose file...
        <input 
            onChange={handleChangeFile}
            className="form-control" 
            type="file"
            hidden          
            multiple
            accept='images/*'
            name="file" />
      </label>
    </div>
    </>
  )
}

export default FileUpload
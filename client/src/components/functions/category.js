import axios from "axios";

export const createCategory = async (authtoken,value) => {
    return await axios.post(process.env.REACT_APP_API + "/category", value,{
      headers: {
        authtoken,
      },
    });
  };

export const listCategory = async (authtoken) => 
  await axios.get(process.env.REACT_APP_API + "/category",{
    headers: {
      authtoken,
    },
  });


export const deleteCategory = async (authtoken,id) => 
  await axios.delete(process.env.REACT_APP_API + "/category/"+id,{
    headers: {
      authtoken,
    },
  });

export const readCategory = async (authtoken,id) => 
  await axios.get(process.env.REACT_APP_API + "/category/"+id,{
    headers: {
      authtoken,
    },
  });

export const editCategory = async (authtoken,id,value) => 
  await axios.put(process.env.REACT_APP_API + "/category/"+id,value,{
    headers: {
      authtoken,
    },
  });

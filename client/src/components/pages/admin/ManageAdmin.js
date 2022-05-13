import React, { useState, useEffect } from "react";
import { Switch, Select, Tag, Modal } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenubarAdmin from "../../layouts/MenubarAdmin";
import { useSelector } from "react-redux";
import moment from "moment/min/moment-with-locales";
// functions
import {
  listUser,
  changeStatus,
  changeRole,
  removeUser,
  resetPassword,
} from "../../functions/users";

const ManageAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  //ช่อมูลที่เลือก
  const [selectData, setSeleteData] = useState([]);
  //ข้อมูล loop dropdown
  const [drop,setDrop]=useState([])

  const showModal = (id) => {
    setIsModalVisible(true);
    setValues({ ...values, id: id });
  };
  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    resetPassword(user.token, values.id, { values })
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    //code
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    //code
    listUser(authtoken)
      .then((res) => {
        //code
        setData(res.data);
        setSeleteData(res.data);
        // [...new set(array)]
        const dataDrop =[...new Set(res.data.map(item=>item.role))] 

        setDrop(dataDrop);
      })
      .catch((err) => {
        //err
        console.log(err.response.data);
      });
  };

  const handleOnchange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };
    changeStatus(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeRole = (e, id) => {
    let values = {
      id: id,
      role: e,
    };
    changeRole(user.token, values)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  const handleRemove = (id) => {
    if (window.confirm("Are You Sure Delete!!")) {
      removeUser(user.token, id)
        .then((res) => {
          console.log(res);
          loadData(user.token);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  const roleData = ["admin", "user"];

  const handleSeleteRole = (e)=>{
    const value =e.target.value
    if(value === 'all'){
      setSeleteData(data)
    }else{
      const filterData =data.filter(item=>{
        return item.role === value
      })

      setSeleteData(filterData);

    }
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>

        <div className="col">
          <h1>ManageAdmin Page</h1>


        
          <select onChange={handleSeleteRole}>
            <option value="all">all</option>
            {drop.map((item,index)=><option value={item} key={index}>{item}</option>)}
          </select>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">username</th>
                <th scope="col">role</th>
                <th scope="col">status</th>
                <th scope="col">created</th>
                <th scope="col">updated</th>
                <th scope="col">actions</th>
              </tr>
            </thead>
            <tbody>
              {selectData.map((item, index) => (
                <tr>
                  <th scope="row">{item.username}</th>
                  <td>
                    <Select
                      style={{ width: "100%" }}
                      value={item.role}
                      onChange={(e) => handleChangeRole(e, item._id)}
                    >
                      {roleData.map((item, index) => (
                        <Select.Option value={item} key={index}>
                          {item === "admin" ? (
                            <Tag color="green">{item}</Tag>
                          ) : (
                            <Tag color="red">{item}</Tag>
                          )}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <Switch
                      checked={item.enabled}
                      onChange={(e) => handleOnchange(e, item._id)}
                    />
                  </td>
                  <td>{moment(item.createdAt).locale("th").format("ll")}</td>
                  <td>
                    {moment(item.updatedAt)
                      .locale("th")
                      .startOf(item.updatedAt)
                      .fromNow()}
                  </td>
                  <td>
                    <DeleteOutlined onClick={() => handleRemove(item._id)} />
                    <EditOutlined onClick={() => showModal(item._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            title="Basic Modal"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>New Password :</p>
            <input
              onChange={handleChangePassword}
              type="text"
              name="password"
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ManageAdmin;

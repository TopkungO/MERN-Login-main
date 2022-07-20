import React from "react";
import { Menu, Badge } from "antd";
import {
  HomeOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  DownOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

// Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Search from "../card/Search";

const Navbar = () => {
  const { SubMenu } = Menu;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="shop" icon={<ShopOutlined />}>
        <Link to="/shop">Shop</Link>
      </Menu.Item>

      <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[10, 0]}>
            Cart
          </Badge>
        </Link>
      </Menu.Item>

      {user && (
        <>
          {/* {user.username} */}
          <SubMenu
            style={{ float: "right" }}
            key="SubMenu"
            icon={<DownOutlined />}
            title={user.username}
          >
            <Menu.Item
              // icon={<LogoutOutlined />}
              key="setting:2"
              // onClick={logout}
            >
              <Link to={"/user/index"}>Dasboaed</Link>
            </Menu.Item>

            {user.role === "admin" ? (
              <Menu.Item
                // icon={<LogoutOutlined />}
                key="setting:3"
                // onClick={logout}
              >
                <Link to={"/admin/index"}>DasboaedAdmin</Link>
              </Menu.Item>
            ) : null}
            <Menu.Item
              icon={<LogoutOutlined />}
              key="setting:1"
              onClick={logout}
            >
              Logout
            </Menu.Item>
          </SubMenu>
        </>
      )}

      {!user && (
        <>
          <Menu.Item
            key="mail"
            style={{ float: "right" }}
            icon={<LoginOutlined />}
          >
            {/* <a href="" ></a>*/}
            <Link to="/login">Login</Link>
          </Menu.Item>

          <Menu.Item
            style={{ float: "right" }}
            key="register"
            icon={<UserAddOutlined />}
          >
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
      <span className="p-1" style={{ float: "right" }}>
        <Search />
      </span>
    </Menu>
  );
};

export default Navbar;

import React from "react";
import { withRouter } from "react-router-dom";
import { Menu } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import "../Sections/Navbar.css";

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`/api/users/logout`).then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 실패!");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <>
        <Menu className="right__menu">
          <Menu.Item key="login">
            <a href="/login">Signin</a>
          </Menu.Item>
          <Menu.Item key="register">
            <a href="/register">Signup</a>
          </Menu.Item>
          {/* <Menu.Item key="write">
            <a href="/board/write">글 쓰기</a>
          </Menu.Item>
          <Menu.Item key="app" onClick={logoutHandler}>
            Logout
          </Menu.Item> */}
        </Menu>
      </>
    );
  } else {
    return (
      <>
        <Menu className="right__menu">
          <Menu.Item key="write">
            <a href="/board/write">글 쓰기</a>
          </Menu.Item>
          <Menu.Item key="app" onClick={logoutHandler}>
            Logout
          </Menu.Item>
        </Menu>
      </>
    );
  }
}

export default withRouter(RightMenu);

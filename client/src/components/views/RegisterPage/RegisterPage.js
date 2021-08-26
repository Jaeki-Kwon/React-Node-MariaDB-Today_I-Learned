import React, { useState } from "react";
import axios from "axios";

import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

function RegisterPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("Email", Email);
    console.log("Name", Name);
    console.log("Password", Password);
    console.log("ConfirmPassword", ConfirmPassword);

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 다릅니다!");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
    };

    // const register = axios
    //   .post("/api/users/register", body)
    //   .then((response) => response.data);
    // if (register) {
    //   props.history.push("/login");
    //   console.log(register);
    // } else {
    //   alert("회원가입을 실패했습니다!");
    // }

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push("/login");
      } else {
        alert(response.payload.err.errmsg);
      }
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmitHandler}
        >
          <label>Email</label>
          <input
            type="email"
            value={Email}
            onChange={onEmailHandler}
            placeholder="Enter email"
          />

          <label>Name</label>
          <input type="text" value={Name} onChange={onNameHandler} />

          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
          />
          <br />
          <button>회원 가입</button>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;

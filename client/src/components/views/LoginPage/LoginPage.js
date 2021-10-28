import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Email", Email);
    console.log("Password", Password);

    let body = {
      email: Email,
      password: Password,
    };

    // axios.post("/api/users/login", body).then((response) => {
    //   if (response.data.isMatch) {
    //     window.localStorage.setItem("userEmail", body.email);
    //     props.history.push("/");
    //     console.log("response.data", response.data);
    //   } else {
    //     alert("Error~~~");
    //   }
    // });

    dispatch(loginUser(body)).then((response) => {
      console.log("RES : ", response);
      if (response.payload.loginSuccess) {
        window.localStorage.setItem("userID", response.payload.userId);
        props.history.push("/");
      } else {
        if (
          response.payload.message ===
          "등록되지 않은 사용자입니다. 이메일을 확인해주세요."
        ) {
          alert("이메일을 다시 입력하시오");
        } else {
          alert("비밀번호를 입력하시오.");
        }
      }
    });
  };

  return (
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
        <input type="email" value={Email} onChange={onEmailHandler} />
        <br />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);

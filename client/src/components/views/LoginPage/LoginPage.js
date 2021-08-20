import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function LoginPage(props) {
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

    axios.post("/api/users/login", body).then((response) => {
      if (response.data.result) {
        props.history.push("/");
        console.log("response.data", response.data);
      } else {
        alert("Error~~~");
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
          <input type="email" value={Email} onChange={onEmailHandler} />
          <br />
          <label>Password</label>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
          <br />
          <button>Login</button>
        </form>
      </div>
    </>
  );
}

export default withRouter(LoginPage);

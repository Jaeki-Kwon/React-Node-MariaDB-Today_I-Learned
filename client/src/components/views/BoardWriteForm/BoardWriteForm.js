import React, { useState } from "react";
import { Button } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { getNow } from "../GetCurrentTime/GetCurrentTime";

function BoardWriteForm(props) {
  // const writer = props.writer;
  // const title = props.titel;
  // const content = props.content;

  // console.log("getTime : ", getNo());

  const user = useSelector((state) => state.user);

  const [Title, setTitle] = useState("");
  const [Data, setData] = useState("");

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onContentHandler = (event) => {
    setData(event.currentTarget.value);
  };

  // const getNow = () => {
  //   let now = new Date();
  //   const year = now.getFullYear();
  //   const month = ("0" + (now.getMonth() + 1)).slice(-2);
  //   const day = ("0" + now.getDate()).slice(-2);
  //   const hour = ("0" + now.getHours()).slice(-2);
  //   const minute = ("0" + now.getMinutes()).slice(-2);

  //   return year + "-" + month + "-" + day + "   " + hour + ":" + minute;
  // };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      writer: user.userData._id,
      title: Title,
      content: Data,
      now: getNow(),
    };

    axios.post("/api/board/write", body).then((response) => {
      console.log("response.data :", response.data);
      if (response.data.success) {
        props.history.push("/");
      } else {
        alert("글 쓰기를 실패했습니다!");
      }
    });
  };

  return (
    <div
      style={{
        paddingTop: "200px",
        marginLeft: "10%",
        marginRight: "10%",
      }}
    >
      <h2 style={{ marginLeft: "45%" }}>글쓰기</h2>
      <input
        type="text"
        placeholder="글 제목"
        style={{ marginBottom: "10px", width: "100%" }}
        defaultValue={Title}
        onChange={onTitleHandler}
      />
      <textarea
        style={{
          width: "100%",
          height: "400px",
          border: "1px solid black",
          marginBottom: "30px",
          paddingTop: "10px",
          paddingLeft: "15px",
          fontSize: "20px",
        }}
        defaultValue={Data}
        onChange={onContentHandler}
      />
      <Button
        onClick={onSubmitHandler}
        style={{ marginTop: "10px", marginLeft: "45%" }}
      >
        저장하기
      </Button>
    </div>
  );
}

export default BoardWriteForm;

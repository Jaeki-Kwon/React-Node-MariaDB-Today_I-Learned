import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import imgA from "../../../img/2.png";
import { useSelector } from "react-redux";

function LandingPage() {
  // useEffect(() => {
  //   axios.get("/api/hello").then((response) => {
  //     console.log(response);
  //   });
  // }, []);
  const user = useSelector((state) => state.user);

  const ex = () => {
    console.log("현재 로그인 된 email", user.userData.email);
    console.log("글을 작성한 email : ", BoardList[0].writer.email);
    console.log(BoardList);
  };

  const [BoardList, setBoardList] = useState([]);

  const getBoardList = () => {
    axios.get("/api/board/getBoardList").then((response) => {
      // console.log("ID : ", response.data.board[0].writer.email);

      if (response.data.board.length > 0) {
        setBoardList(response.data.board);
      } else {
        alert("글이 없습니다!");
      }
    });
  };

  useEffect(() => {
    getBoardList();
  }, []);

  const board = BoardList.map((item, index) => {
    if (user.userData.email === item.writer.email) {
      return (
        <tr key={index}>
          <th style={{ border: "1px solid black" }}>
            <Link to={`/board/${item._id}`}>{item.createdAt}</Link>
          </th>
          <th style={{ border: "1px solid black" }}>
            <Link to={`/board/${item._id}`}>{item.title}</Link>
          </th>
        </tr>
      );
    }
  });

  if (user.userData && !user.userData.isAuth) {
    return (
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={imgA}
          style={{ marginTop: "70px" }}
          width="100%"
          height="300px"
          alt="study"
          onClick={ex}
        />
        <table
          style={{
            width: "70%",
            border: "1px solid black",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black" }}>날짜</th>
              <th style={{ border: "1px solid black" }}>글 제목</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div
        className="main"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={imgA}
          style={{ marginTop: "70px" }}
          width="100%"
          height="300px"
          alt="study"
          onClick={ex}
        />
        <table
          style={{
            width: "70%",
            border: "1px solid black",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black" }}>날짜</th>
              <th style={{ border: "1px solid black" }}>글 제목</th>
            </tr>
          </thead>
          <tbody>{board}</tbody>
        </table>
      </div>
    );
  }
}

export default LandingPage;

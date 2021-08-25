import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import imgA from "../../../img/2.png";
import { useSelector } from "react-redux";

function LandingPage() {
  const user = useSelector((state) => state.user);

  console.log("UserID : ", user);
  const ex = () => {
    console.log("현재 로그인 된 id", user.userData._id);
    console.log("현재 로그인 된 email", user.userData.email);
    // console.log("글을 작성한 email : ", BoardList[0].writer.email);
    // console.log(user.userData._id);
  };

  const [BoardList, setBoardList] = useState([]);

  const getBoardList = () => {
    console.log("User111 : ", user);
    // ?id=${user.userData._id}
    axios
      .get(`/api/board/getBoardList?id=${user.userData._id}`)
      .then((response) => {
        console.log("ID : ", response.data.board);
        if (response.data.board.length > 0) {
          setBoardList(response.data.board);
        } else {
          alert("글이 없습니다!");
        }
      });
  };

  useEffect(() => {
    getBoardList();
    console.log("User222 : ", user);
  }, []);

  console.log("BoardList!!!! : ", BoardList.length);
  console.log("User333 : ", user);

  const board = BoardList.map((item, index) => {
    console.log("item : ", item);
    console.log("User444 : ", user);
    return (
      <tr key={index}>
        <th style={{ border: "1px solid black" }}>
          <Link to={`/board/${item.id}`}>{item.createDate}</Link>
        </th>
        <th style={{ border: "1px solid black" }}>
          <Link to={`/board/${item.id}`}>{item.title}</Link>
        </th>
      </tr>
    );
  });

  if (user.userData && !user.userData.isAuth && BoardList !== undefined) {
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
          {console.log("Use5555 :sadfsdaffsdafsda ")}
        </table>
      </div>
    );
  }
}

export default LandingPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import imgA from "../../../img/2.png";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

function LandingPage() {
  const user = useSelector((state) => state.user);

  console.log(localStorage);

  console.log("UserID : ", user);

  const [BoardList, setBoardList] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  // 현재페이지 가져오기
  const indexLastBoard = currentPage * postPerPage;
  const indexFirstBoard = indexLastBoard - postPerPage;
  const currentBoards = BoardList.slice(indexFirstBoard, indexLastBoard);
  const currentBoards2 = BoardList.slice(11, 20);

  const ex = () => {
    console.log("BoardList : ", BoardList);
    console.log(currentBoards.length);
    console.log("currentBoards2 : ", currentBoards2);
    console.log("indexFirstBoard : ", indexFirstBoard);
    console.log("indexLastBoard : ", indexLastBoard);
    console.log("postPerPage : ", postPerPage);
  };

  // 페이지 바꾸기
  const paginate = (pageNum) => setcurrentPage(pageNum);

  const getBoardList = () => {
    axios
      .get(`/api/board/getBoardList?id=${localStorage.userID}`)
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
  }, []);

  const board = currentBoards.map((item, index) => {
    // console.log("Item : ", item);
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
        </table>
        <Pagination
          postPerPage={postPerPage}
          totalBoards={BoardList.length}
          paginate={paginate}
        />
      </div>
    );
  }
}

export default LandingPage;

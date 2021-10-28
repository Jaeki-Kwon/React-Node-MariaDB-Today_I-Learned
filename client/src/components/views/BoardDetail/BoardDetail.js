import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import axios from "axios";

function BoardDetail(props) {
  console.log(props.match);
  let boardId = props.match.params.boardId;
  const variable = { boardId: boardId };

  const [Board, setBoard] = useState(null);

  useEffect(() => {
    axios.post("/api/board/getBoardDetail", variable).then((response) => {
      if (response.data.success) {
        console.log("variable", variable);
        console.log("BoardDetail : ", response.data.boardDetail);
        setBoard(response.data.boardDetail);
      } else {
        alert("정보들을 가져오는데 실패했습니다!");
      }
    });
  }, []);

  const deleteBoard = () => {
    axios.post("/api/board/deleteBoard", Board).then((response) => {
      if (response.data.success) {
        window.location.href = "/";
      } else {
        alert("삭제를 실패했습니다!");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "140px",
      }}
    >
      {Board !== null && (
        <>
          <label
            style={{
              marginBottom: "20px",
              width: "500px",
              border: "1px solid black",
              paddingLeft: "10px",
              fontSize: "20px",
            }}
          >
            {console.log("Board.title : ", Board[0])}
            {Board[0].title}
          </label>
          <ul
            style={{
              width: "500px",
              height: "400px",
              border: "1px solid black",
              marginBottom: "30px",
              paddingTop: "10px",
              paddingLeft: "15px",
              fontSize: "20px",
            }}
          >
            {console.log("Board.content : ", Board[0])}
            {Board[0].content.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </ul>
        </>
      )}
      <div>
        <Link to={`/board/${boardId}/update`}>
          <Button style={{ marginRight: "50px" }}>글 수정</Button>
        </Link>
        <Button onClick={deleteBoard}>글 삭제</Button>
      </div>
    </div>
  );
}

export default BoardDetail;

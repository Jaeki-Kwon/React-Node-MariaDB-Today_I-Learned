import React, { useState, useEffect } from "react";
import { Button } from "antd";
import axios from "axios";
import { getNow } from "../GetCurrentTime/GetCurrentTime";

function BoardUpdate(props) {
  let boardId = props.match.params.boardId;

  const variable = { boardId: boardId };

  const [Title, setTitle] = useState("");
  const [Data, setData] = useState("");

  useEffect(() => {
    axios.post("/api/board/getBoardDetail", variable).then((response) => {
      if (response.data.success) {
        console.log("variable", variable);
        console.log("BoardDetail : ", response.data.boardDetail[0]);
        setTitle(response.data.boardDetail[0].title);
        setData(response.data.boardDetail[0].content);
      } else {
        alert("정보들을 가져오는데 실패했습니다!");
      }
    });
  }, []);

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onContentHandler = (event) => {
    setData(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      boardId: boardId,
      title: Title,
      content: Data,
      now: getNow(),
    };

    axios.post("/api/board/updateBoard", body).then((response) => {
      if (response.data.success) {
        props.history.push(`/board/${boardId}`);
      } else {
        alert("수정하지 못했습니다!");
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
      <h2 style={{ marginLeft: "45%" }}>글 쓰기</h2>
      <input
        type="text"
        placeholder="글 제목"
        style={{ marginBottom: "10px", width: "100%" }}
        defaultValue={Title}
        onChange={onTitleHandler}
      />
      <textarea
        type="text"
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
        수정하기
      </Button>
    </div>
  );
}

export default BoardUpdate;

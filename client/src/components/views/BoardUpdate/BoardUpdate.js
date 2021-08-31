import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "antd";
import axios from "axios";
import { getNow } from "../GetCurrentTime/GetCurrentTime";

function BoardUpdate(props) {
  let boardId = props.match.params.boardId;

  const [Title, setTitle] = useState("");
  const [Data, setData] = useState("");

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleChange = (e, editor) => {
    setData(editor.getData());
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log(props);
    console.log(event);

    console.log("Title", Title);
    console.log("Data", Data);
    let text = Data.replace(/&nbsp;/gi, "");
    text = text.replace(/(<([^>]+)>)/gi, "");
    text = text.replace(/<br\/>/gi, "\n");
    text = text.replace(
      /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/gi,
      ""
    );
    console.log("Text", text);

    let body = {
      boardId: boardId,
      title: Title,
      content: text,
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
        value={Title}
        onChange={onTitleHandler}
      />
      <CKEditor
        editor={ClassicEditor}
        onChange={(e, editor) => {
          handleChange(e, editor);
        }}
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

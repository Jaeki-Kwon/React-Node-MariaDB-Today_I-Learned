const express = require("express");
const router = express.Router();
const db = require("../db");
const { auth } = require("../middleware/auth");

router.post("/write", (req, res) => {
  let { title, content, writer, now } = req.body;
  console.log(req.body);
  const sqlQuery =
    "INSERT INTO board (title, content, writer, createDate) VALUES (?, ?, ?, ?)";
  db.query(sqlQuery, [title, content, writer, now], (err, result) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.get("/getBoardList", (req, res) => {
  console.log(req.query);
  const sqlQuery =
    "SELECT * FROM board WHERE board.writer=? ORDER BY board.id DESC ";
  // const sqlQuery =
  //   "SELECT email, title, content, createDate, board.id FROM user, board WHERE user.id=board.writer";
  db.query(sqlQuery, req.query.id, (err, board) => {
    // console.log("Result : ", board);
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, board });
  });
});

router.post("/getBoardDetail", (req, res) => {
  console.log("req.body : ", req.body);
  let boardId = req.body.boardId;
  const sqlQuery = "SELECT * FROM board WHERE id=?";
  db.query(sqlQuery, boardId, (err, boardDetail) => {
    console.log("Result!!! : ", boardDetail);
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, boardDetail });
  });
});

router.post("/deleteBoard", (req, res) => {
  let deleteData = req.body[0].id;
  console.log("asdf : ", deleteData);
  const sqlQuery = "DELETE FROM board WHERE id=? ";
  db.query(sqlQuery, deleteData, (err, del) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post("/updateBoard", (req, res) => {
  console.log("~~~~ : ", req.body);
  console.log("~~~~1 : ", req.body);
  let { boardId, title, content, now } = req.body;
  const sqlQuery = "SELECT id FROM board WHERE id = ?";
  db.query(sqlQuery, boardId, (err, id) => {
    console.log("ID : ", id[0]);
    const update =
      "UPDATE board SET title=?, content=?, createDate=? WHERE id=?";
    db.query(update, [title, content, now, boardId], (err, update) => {
      console.log("Update : ", update);
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, update });
    });
  });
});

module.exports = router;

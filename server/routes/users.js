const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.post("/register", (req, res) => {
  let { email, name, password } = req.body;
  const sqlQuery = "INSERT INTO user (email, name, password) VALUES (?,?,?)";

  console.log("body : ", req.body);
  console.log("PASSWORD : ", password);

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(400).send(err);
    password = hash;
    db.query(sqlQuery, [email, name, password], (err, result) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    });
  });
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  const sqlQuery = "SELECT * FROM user WHERE email=?";
  db.query(sqlQuery, email, (err, user) => {
    if (err) return res.status(400).send(err);
    console.log("password :", password);
    console.log("row :", user);
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          res.status(200).json({ loginSuccess: true });
        } else {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        }
      });
    } else {
      return res.json({
        loginSuccess: false,
        message: "등록되지 않은 사용자입니다. 이메일을 확인해주세요.",
      });
    }
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");

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
    // console.log("password :", password);
    // console.log("row :", user[0].id);
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, isMatch) => {
        if (isMatch) {
          let generateToken = jwt.sign(user[0].id, "secreteToken");

          const update = "UPDATE user SET token=? WHERE email=?";
          const updateData = [generateToken, email];
          db.query(update, updateData, (err, result) => {
            if (err) return res.json({ success: false, err });
          });
          res
            .cookie("x_auth", generateToken)
            .status(200)
            .json({ loginSuccess: true, isMatch: true, user });
          console.log("User : ", user);
          console.log("Token : ", generateToken);
          console.log("로그인성공?");
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

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    message: "넘어왔나?",
    _id: req.user.id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
});

router.get("/logout", auth, (req, res) => {
  let { id, token } = req.user;
  console.log("ID : ", id);
  console.log("Token : ", token);

  let resetToken = "";

  const sqlQuery = "SELECT * FROM user WHERE id=?";
  db.query(sqlQuery, id, (err, user) => {
    console.log("User!!! : ", user);

    const updateData = [resetToken, id];
    console.log("UpdateData : ", updateData);
    const update = "UPDATE user SET token=? WHERE id=?";
    db.query(update, updateData, (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    });
  });
});

module.exports = router;

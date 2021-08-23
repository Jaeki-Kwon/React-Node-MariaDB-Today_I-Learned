const db = require("../db");
const jwt = require("jsonwebtoken");

let auth = (req, res, next) => {
  let token = req.cookies.x_auth;
  console.log("Decoded : ", token);

  const sqlQuery = "SELECT * FROM user WHERE token=?";
  db.query(sqlQuery, token, (err, user) => {
    if (err) throw err;
    if (!user[0]) return res.json({ isAuth: false, error: true });

    console.log("User~~ : ", user);
    jwt.verify(token, "secreteToken", function (err, decoded) {
      if (err) {
        return res
          .status(500)
          .json({ error: "token을 decode하는 데 실패 했습니다.", err });
      }
      user[0].id = decoded;

      req.user = user[0];

      //   console.log("user.id : ", user[0].id);
      //   console.log("Decode : ", decoded);
      console.log("req.user : ", req.user);
    });
    next();
  });
};

module.exports = { auth };

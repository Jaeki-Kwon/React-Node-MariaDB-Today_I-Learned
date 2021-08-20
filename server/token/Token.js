const db = require("../db");
const jwt = require("jsonwebtoken");

// exports.generateToken = (req, res) => {
//   let { email } = req.body;
//   console.log(req.body.email);
//   const sqlQuery = "SELECT * FROM user WHERE email=?";
//   db.query(sqlQuery, email, (err, user) => {
//     let token = jwt.sign(user[0].id, "secreteToken");
//     user.token = token;
//     console.log("Token : ", token);
//     user.save(function (err, user) {
//       if (err) return cb(err);
//       cb(null, user);
//     });
//   });
// };

exports.generateToken = () => {
  console.log("넘오와짐?");
  db.query("SELECT * FROM user ", (err, user) => {
    console.log("User : ", user[1]);

    for (let i = 0; i < user.length; i++) {
      //   console.log(user[i].id);
      let token = jwt.sign(user[i].id, "secreteToken");
      user.token = token;
      console.log("Token : ", token);
    }
  });
};

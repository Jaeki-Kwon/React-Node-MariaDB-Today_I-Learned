const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/board", require("./routes/board"));

app.use(express.static(path.join("../client/build")));


app.get("*", (req, res) => {
  res.sendFile(path.resolve("../client", "build", "index.html"));
});

const PORT = process.env.PORT || 8000;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);

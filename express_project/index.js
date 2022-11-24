const express = require("express");
const app = express();
const mysql = require("mysql");

const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "test",
});

app.get("/", (req, res) => {
  res.send("hello world??");
});

app.use("/static", express.static("public"));

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});

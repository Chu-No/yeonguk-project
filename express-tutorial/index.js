const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    key: "userId",
    secret: "rorkxdmsrj",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// DB 연결
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "login",
});

connection.connect((error) => {
  if (error) throw error;
  else console.log("connected to database");
});

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.redirect("/public/index.html");
});

app.post("/api/auth/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      connection.query(
        `INSERT INTO userInfo (username, password) VALUES (?, ?)`,
        [req.body.username, hash],
        (error, results, fields) => {
          if (error) {
            console.log(error);
            res.send({
              status: 400,
            });
          } else {
            res.send({
              status: 200,
              results: results,
            });
          }
        }
      );
    }
  });
});

app.post("/api/auth/login", (req, res) => {
  connection.query(
    `SELECT * FROM userInfo WHERE username = ?`,
    [req.body.username],
    (error, results, fields) => {
      if (error) {
        res.send({
          status: "error",
        });
      } else {
        if (results.length > 0) {
          bcrypt.compare(
            req.body.password,
            results[0].password,
            (err, response) => {
              req.session.user = results[0];
              console.log(req.session.user);
              if (response) {
                res.send({
                  status: "success",
                  data: results[0],
                });
              } else {
                res.send({
                  status: "incorrect password",
                });
              }
            }
          );
        } else {
          console.log("no user");
          res.send({
            status: "error",
          });
        }
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

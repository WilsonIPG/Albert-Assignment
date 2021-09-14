const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

app.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

server.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = "Account already exist";
    res.status(status).send({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    var data = JSON.parse(data.toString());

    var last_item_id = data.users[data.users.length - 1].id;

    data.users.push({ id: last_item_id + 1, email: email, password: password });
    var writeData = fs.writeFile(
      "./users.json",
      JSON.stringify(data),
      (err, result) => {
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  const access_token = createToken({ email, password });
  console.log("Access Token:" + access_token);
  const message = "Register successfully";

  res.status(200).send({ access_token, message });
});

server.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).send({ status, message });
    return;
  }
  const access_token = createToken({ email, password });

  const message = "Login successfully";
  const status = 200;
  res.status(status).send({ status, access_token, message });
});

server.get("/getUser", (req, res) => {
  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    var dataStore = JSON.parse(data.toString());
    res.status(200).send(dataStore.users);
  });
});

app.use(express.static(path.join(__dirname, "../client/dist")));
app.listen(3000, () => console.log("Listening on port: 3000"));

server.listen(8000, () => {
  console.log("Run Auth API JSON Server on port: 8000");
});

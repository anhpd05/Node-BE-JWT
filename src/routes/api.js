const express = require("express");
const routerAPI = express.Router();
const { registerAPI, loginAPI } = require("../controllers/user.controller");

routerAPI.get("", (req, res) => {
  return res.json("Hello world with abc");
});

routerAPI.post("/register", registerAPI);

routerAPI.post("/login", loginAPI);

module.exports = routerAPI; //export default

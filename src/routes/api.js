const express = require("express");
const routerAPI = express.Router();
const {
  registerAPI,
  loginAPI,
  getAllUserAPI,
} = require("../controllers/user.controller");
const delay = require("../middleware/delay/delay");
routerAPI.all("*", delay);
routerAPI.get("", delay, (req, res) => {
  return res.json("Hello world with abc");
});

routerAPI.post("/register", registerAPI);

routerAPI.post("/login", loginAPI);

routerAPI.get("/user", getAllUserAPI);

module.exports = routerAPI; //export default

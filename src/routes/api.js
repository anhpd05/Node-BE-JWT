const express = require("express");
const routerAPI = express.Router();
const {
  registerAPI,
  loginAPI,
  getAllUserAPI,
} = require("../controllers/user.controller");
const auth = require("../middleware/auth/auth");
routerAPI.all("*", auth);
routerAPI.get("", auth, (req, res) => {
  return res.json("Hello world with abc");
});

routerAPI.post("/register", registerAPI);

routerAPI.post("/login", loginAPI);

routerAPI.get("/user", getAllUserAPI);

module.exports = routerAPI; //export default

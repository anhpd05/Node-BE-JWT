require("dotenv").config();
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  console.log(req.url);
  if (req.url === "/" || req.url === "/login" || req.url === "/register") {
    return next();
  } else {
    if (req.headers.authorization && req.headers) {
      const token = req.headers.authorization.split(" ")[1];
      // verify token
      try {
        // hợp lệ => giải mã đc
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);
        next();
      } catch (error) {
        // console.log(error);
        return res.status(401).json({
          message: " Token không hợp lệ/Hoặc token hết hạn",
          // jwt expired and  invalid signature (2 lỗi phổ biến.)
        });
      }
    } else {
      return res.status(401).json({
        message: " Bạn chưa truyền token/Hoặc token hết hạn",
      });
    }
  }
};
module.exports = auth;

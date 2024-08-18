const delay = (req, res, next) => {
  if (req.url === "/" || req.url === "/login" || req.url === "/register")
    return next();
  setTimeout(() => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      console.log(token);
    }
    next();
  }, 3000);
};
module.exports = delay;

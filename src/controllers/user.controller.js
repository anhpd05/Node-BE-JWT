const { createUserService } = require("../handleDataBase/userService");

const registerAPI = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const data = await createUserService(name, email, password);
  return res.status(200).json({
    data: data,
  });
};
module.exports = {
  registerAPI,
};

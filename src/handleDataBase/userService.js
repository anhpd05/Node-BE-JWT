const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  try {
    // hash Pass
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    // const hashPasswordCach2 = await bcrypt.hash(password, saltRounds);
    console.log(hashPassword);

    // save record
    let result = await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: "05JuLy",
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isComparePass = await bcrypt.compare(password, user.password);
      if (!isComparePass) {
        return {
          EC: 2,
          EM: "Pass/Email không hợp lệ",
        };
      } else {
        return " Tạo access token ";
      }
    } else {
      return {
        EC: 1,
        EM: "Pass/Email không hợp lệ.",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
  loginService,
};

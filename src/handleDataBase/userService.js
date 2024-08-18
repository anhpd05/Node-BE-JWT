require("dotenv").config();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
  try {
    const exsitEmail = await User.find({ email: email });
    if (exsitEmail) {
      return `Đã tồn tại email `;
    }

    // hash Pass
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    // const hashPasswordCach2 = await bcrypt.hash(password, saltRounds);
    // console.log(hashPassword);

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
        // create access_token
        const payload = {
          email: user.email,
          name: user.name,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES,
        });
        return {
          EC: 0,
          access_token: access_token,
          data: payload,
        };
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

const getAllUser = async () => {
  try {
    let result = await User.find();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createUserService,
  loginService,
  getAllUser,
};

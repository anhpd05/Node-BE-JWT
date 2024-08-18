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

module.exports = {
  createUserService,
};

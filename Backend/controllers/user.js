// import bcrypt from 'bcrypt';
// import User from '../models/User.js';
// import { generate } from '../helpers/token.js';
// import  ROLES  from '../constants/roles.js';

const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const { generate } = require("../helpers/token.js");
const ROLES = require("../constants/roles.js");

// Register
async function register(login, password) {
  if (!password) {
    throw new Error("Пароль не может быть пустым");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user._id });
  return { token, user };
}
//--------------------------------------------------------------------//

//login
async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Неверный пароль");
  }

  const token = generate({ id: user._id });
  return { user, token };
}
//___________________________________________________________________________//

 function getUsers() {
  return User.find({});
}

 function getRoles() {
  return [
    {
      id: ROLES.ADMIN,
      name: "Admin",
    },
    {
      id: ROLES.MODERATOR,
      name: "Moderator",
    },
    {
      id: ROLES.USER,
      name: "User",
    },
  ];
}

//delete
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}
//______________________________//

//edit
async function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" });
}
//______________________________//

module.exports = { register, login, getUsers, getRoles, deleteUser, updateUser };

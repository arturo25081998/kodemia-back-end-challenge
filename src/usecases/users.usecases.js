const User = require("../models/user.model");
const encription = require("../lib/encription");
const createError = require("http-errors");
const jwt = require("../lib/jwt");
const { sign } = require("jsonwebtoken");

async function create(data) {
  existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw createError(400, "User alredy exist");
  }
  if (!data.password) {
    throw createError(400, "Password require");
  }
  if (data.password.length < 6) {
    throw createError(400, "Password is too short.");
  }

  const password = encription.encrypt(data.password); //Se debe encriptar
  data.password = password;
  const newUser = await User.create(data);
  return newUser;
}

async function getAll() {
  const users = await User.find({});
  return users;
}

async function getById(id) {
  const user = await User.findById(id);
  return user;
}

async function login(data) {
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) {
    throw createError(401, "Invalid credentials");
  }

  const isValidPassword = encription.compare(data.password, user.password);

  if (!isValidPassword) {
    throw createError(401, "Invalid credentials");
  }

  const token = jwt.sign({ id: user._id });
  return token;
}

module.exports = {
  create,
  getAll,
  getById,
  login,
};

const User = require("../models/user.model");
const encription = require("../lib/encription");
const createError = require("http-errors");
const jwt = require("../lib/jwt");

async function create(data) {
  const newUser = await User.create(data);
  return newUser;
}

async function getAll() {
  const users = await User.find({});
  return users;
}

module.exports = {
  create,
  getAll,
};

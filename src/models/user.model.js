const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  profilePic: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+"),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("users", userSchema);

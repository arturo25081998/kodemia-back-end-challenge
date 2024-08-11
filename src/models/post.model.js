const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  image: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
    minLength: 15,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "users",
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

module.exports = mongoose.model("posts", postSchema);

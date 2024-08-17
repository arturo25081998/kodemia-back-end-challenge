const Post = require("../models/post.model");
const createError = require("http-errors");

async function create(data) {
  const newPost = await Post.create(data);
  return newPost;
}

async function getAll(search) {
  let searchObject = {};
  if (search) {
    console.log(search);
    searchObject = {
      title: new RegExp(search, "i"),
    };
  }

  const posts = await Post.find(searchObject);
  return posts;
}

async function getById(id) {
  const existingPost = await Post.findById(id);
  if (!existingPost) {
    throw createError(404, "Post not found");
  }
  return existingPost;
}

async function deleteById(id) {
  const existingPost = await Post.findById(id);
  if (!existingPost) {
    throw createError(404, "Post not found");
  }
  const postDelted = await Post.findByIdAndDelete(id);
  return postDelted;
}

async function updateById(id, data) {
  const existingPost = await Post.findById(id);
  if (!existingPost) {
    throw createError(404, "Post not found");
  }
  if (data.user) {
    throw createError(400, "Creator can't be updated");
  }
  const post = await Post.findByIdAndUpdate(id, data, {
    new: true,
  });
  return post;
}

module.exports = {
  create,
  getAll,
  deleteById,
  updateById,
  getById,
};

const express = require("express");
const postUseCases = require("../usecases/posts.usecases");
const createError = require("http-errors");
const router = express.Router();
const auth = require("../middlewares/auth");

router.delete("/:id", auth, async (request, response) => {
  try {
    const id = request.params.id;
    const post = await postUseCases.getById(id);
    if (post.user != request.user.id) {
      throw createError(400, "Only the creator of this post can deleted");
    }
    const postDeleted = await postUseCases.deleteById(id);
    response.json({
      success: true,
      message: "Post deleted by id",
      data: { post: postDeleted.id },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", auth, async (request, response) => {
  try {
    const id = request.params.id;
    const postData = request.body;
    postData.updatedAt = new Date();
    const postUpdated = await postUseCases.updateById(id, postData);
    response.json({
      success: true,
      message: "Post updated",
      data: { post: postUpdated },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", auth, async (request, response) => {
  try {
    const postData = request.body;
    postData.user = request.user.id;
    const newPost = await postUseCases.create(postData);
    response.json({
      success: true,
      message: "Post created",
      data: { post: newPost },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/", async (request, response) => {
  try {
    const posts = await postUseCases.getAll();
    response.json({
      success: true,
      message: "All post",
      data: { posts },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const post = await postUseCases.getById(id);
    response.json({
      success: true,
      message: "All post",
      data: { post },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/search/:search", auth, async (request, response) => {
  try {
    const search = request.params.search;
    const posts = await postUseCases.getAll(search);
    response.json({
      success: true,
      message: "All post",
      data: { posts },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

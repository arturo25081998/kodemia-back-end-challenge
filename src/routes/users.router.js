const express = require("express");
const userUseCases = require("../usecases/users.usecases");
const createError = require("http-errors");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const users = await userUseCases.getAll();
    response.json({
      success: true,
      message: "All users",
      data: { users },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (request, response) => {
  try {
    const userData = request.body;
    const newUser = await userUseCases.create(userData);
    response.json({
      success: true,
      message: "User Created",
      data: { user: newUser },
    });
  } catch (error) {
    response.status(error.status || 500);
    response.json({
      success: false,
      message: error.message,
    });
  }
});

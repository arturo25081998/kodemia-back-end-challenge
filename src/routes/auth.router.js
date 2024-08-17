const express = require("express");
const userUseCases = require("../usecases/users.usecases");
const createError = require("http-errors");
const router = express.Router();

router.post("/login", async (request, response) => {
  try {
    const userData = request.body;
    const token = await userUseCases.login(userData);
    response.json({
      success: true,
      message: "User logged",
      data: { token },
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

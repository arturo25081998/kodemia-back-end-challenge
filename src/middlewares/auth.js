const createHttpError = require("http-errors");
const jwt = require("../lib/jwt");
const userUseCases = require("../usecases/users.usecases");

async function auth(request, response, next) {
  try {
    const authorization = request.headers.authorization;

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      throw createHttpError(401, "Token is required");
    }

    const payload = jwt.verify(token);
    const user = await userUseCases.getById(payload.id);
    //console.log(user.id);
    request.user = user;

    next();
  } catch (error) {
    response.status(error.status || 401);
    response.json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = auth;

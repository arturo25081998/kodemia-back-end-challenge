const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    success: true,
    message: "Back-End challenge API",
  });
});

module.exports = app;

const express = require("express");
const routes = express.Router();
const passport = require("passport");

routes.get("/", function (req, res) {
  res.end("in user");
});

module.exports = routes;

const express = require("express");
const passport = require("passport");
const routes = express.Router();

routes.use("/user", require("./user"));
routes.use("/api", require("./api/index"));

module.exports = routes;

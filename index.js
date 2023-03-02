const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");
const cookieParser = require("cookie-parser");
const MongoDbStore = require("connect-mongo");
const path = require("path");
require("dotenv").config();
// app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    name: "name",
    secret: "ankitwebsite",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    store: MongoDbStore.create({
      mongoUrl: process.env.DATABASE,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes/index"));

const port = 8000;

if (process.env.NODE_ENV === "production") {
  // app.use(express.static("client/build"));
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
app.listen(process.env.PORT || port, function (err) {
  if (err) {
    return;
  } else {
    console.log("started port ");
  }
});

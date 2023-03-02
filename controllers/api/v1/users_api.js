const User = require("./../../../models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (passwordMatch === false) {
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    return res.json(200, {
      message: "Signin sucessful , here is your token , please keep it safe!",
      data: {
        token: jwt.sign(user.toJSON(), "codeial", { expiresIn: "100000000" }),
      },
    });
  } catch (error) {
    return res.json(500, {
      message: `internal server error`,
    });
  }
};

module.exports.create_user = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.json("500", {
        message: "password & confirm didnot  match",
      });
    }
    //check if user already exists or not
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.json("500", {
        message: `user already exist with same email address`,
      });
    }
    //if no user is present with this email
    //create new user

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });
    return res.json("200", {
      message: `user sucessfully created`,
    });
  } catch (error) {
    return res.json(500, {
      message: `internal server error ${error} email ${req.body.email}`,
    });
  }
  //if password and confirm password doesnot match
  //if matches then
};

module.exports.log_out = async function (req, res) {
  req.logout();
  return res.json("200", {
    message: `user logged out sucessfully`,
  });
};

module.exports.check_authentication = async function (req, res) {
  if (req.isAuthenticated()) {
    return res.json("200", {
      message: "user is authenticated",
      user: req.user.id,
    });
  } else {
    return res.json("200", {
      message: "user is not authenticated",
    });
  }
};

module.exports.get_details = async function (req, res) {
  return res.json("200", {
    message: "get your details",
    data: req.user,
  });
};
module.exports.update_details = async function (req, res) {
  // let user = await User.findOne({ email: req.body.email });
  let user = await User.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
  });
  console.log(user);
  return res.json("200", {
    message: "get your details",
    // data: user,
  });
};

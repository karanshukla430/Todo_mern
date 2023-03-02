const express = require("express");
const passport = require("passport");
const router = express.Router();
const userapi = require("./../../../controllers/api/v1/users_api");

router.post("/create-session", userapi.createSession);
router.post("/create-user", userapi.create_user);
router.get("/logout", userapi.log_out);
router.get(
  "/get-details",
  passport.authenticate("jwt", { session: false }),
  userapi.get_details
);
router.post(
  "/user-update-details",
  passport.authenticate("jwt", { session: false }),
  userapi.update_details
);
router.get(
  "/check-authentication",
  passport.authenticate("jwt", { session: false }),
  userapi.check_authentication
);

module.exports = router;

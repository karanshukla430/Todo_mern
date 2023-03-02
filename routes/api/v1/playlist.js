const express = require("express");
const passport = require("passport");
const passport_jwt = require("passport-jwt");
const router = express.Router();
const playlistapi = require("./../../../controllers/api/v1/playlist_api");

router.post(
  "/create-playlist",
  passport.authenticate("jwt", { session: false }),
  playlistapi.post_new_playlist
); //need_auth
router.post(
  "/add-to-playlist",
  passport.authenticate("jwt", { session: false }),
  playlistapi.post_add_to_playlist
); //need_auth
router.post(
  "/update-playlist",
  passport.authenticate("jwt", { session: false }),
  playlistapi.post_update_playlist
); //need_auth

router.get(
  "/user-all-playlist",
  passport.authenticate("jwt", { session: false }),
  playlistapi.get_all_user_playlists
);
router.get("/entire-playlist", playlistapi.get_all_playlists);

router.post(
  "/playlist-data-private",
  passport.authenticate("jwt", { session: false }),
  playlistapi.get_playlist_data_private
); //need_auth
router.post("/playlist-data-public", playlistapi.get_playlist_data_public); //need_auth
module.exports = router;

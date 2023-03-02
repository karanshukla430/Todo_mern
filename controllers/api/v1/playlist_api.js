const { Mongoose } = require("mongoose");
const Playlist = require("../../../models/playlist");
const User = require("../../../models/user");
const mongoose = require("mongoose");

module.exports.get_all_playlists = async function (req, res) {
  try {
    let playlists = await Playlist.find();
    console.log("aa");
    return res.json("200", {
      message: "get all playlist sucessful",
      data: playlists,
    });
  } catch (error) {
    return res.json("200", {
      message: `internal server error ${error}`,
    });
  }
};

//Done
module.exports.post_add_to_playlist = async function (req, res) {
  try {
    let playlist_id = mongoose.Types.ObjectId(req.body.playlist);

    let playlist = await Playlist.findByIdAndUpdate(playlist_id, {
      $push: {
        movies: {
          movie_id: req.body.movie_id,
          name: req.body.movie_name,
          poster_link: req.body.poster_link,
        },
      },
    });

    return res.json("200", {
      message: "Sucessfully added to playlist",
      playlist: playlist,
    });
  } catch (error) {
    return res.json("200", {
      message: `internal server error ${error}`,
    });
  }
};

//DONE
module.exports.post_new_playlist = async function (req, res) {
  try {
    let playlist = await Playlist.create({
      user_id: req.user.id,
      playlist_name: req.body.playlist_name,
      task: req.body.data,
    });
    // console.log(playlist);
    let user = await User.findById(req.user.id);
    user.playlists.push(playlist);
    user.save();

    return res.json("200", {
      message: `${req.body.playlist_name} created successfully`,
    });
  } catch (error) {
    return res.json("200", {
      message: `internal server error ${error}`,
    });
  }
}; //done
module.exports.post_update_playlist = async function (req, res) {
  try {
    let playlist_id = mongoose.Types.ObjectId(req.body.main_id);
    // console.log(playlist_id);
    let playlist = await Playlist.findByIdAndUpdate(playlist_id, {
      user_id: req.user.id,
      playlist_name: req.body.playlist_name,
      task: req.body.data,
    });
    return res.json("200", {
      message: `${req.body.playlist_name} created successfully`,
    });
  } catch (error) {
    return res.json("200", {
      message: `internal server error ${error}`,
    });
  }
}; //done

module.exports.get_all_user_playlists = async function (req, res) {
  try {
    let playlists;
    if (req.user) {
      let user = await User.findById(req.user.id).populate("playlists");
      playlists = user.playlists;

      return res.json("200", {
        message: "get all user playlist sucessful",
        data: playlists,
      });
    } else {
      return res.json("404", {
        message: "User info not found",
      });
    }
  } catch (error) {
    return res.json("200", {
      message: `internal server error ${error}`,
    });
  }
};

module.exports.get_playlist_data_public = async function (req, res) {
  //inputs ->
  try {
    let playlist = await Playlist.findById(req.body.playlist_id);

    return res.json("200", {
      message: "request sucessful",
      data: playlist,
    });
  } catch (error) {
    return res.json("200", {
      message: `internal server error ${error}`,
    });
  }
};

module.exports.get_playlist_data_private = async function (req, res) {
  //inputs ->
  try {
    let playlist = await Playlist.findById(req.body.playlist_id);

    if (playlist.isPrivate == true) {
      if (playlist.user_id != req.user.id) {
        return res.json("401", {
          message: "unauthrised request",
        });
      }
    }

    return res.json("200", {
      message: "request sucessful",
      data: playlist,
    });
  } catch (error) {
    return res.json("200", {
      message: `internal server error ${error}`,
    });
  }
};

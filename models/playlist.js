const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    playlist_name: {
      type: String,
      required: true,
    },
    task: [
      {
        task_id: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// static functions  that can be used from anywhere in the class

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },

    playlists: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Playlist",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// static functions  that can be used from anywhere in the class

const User = mongoose.model("User", userSchema);

module.exports = User;

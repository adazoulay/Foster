const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    outlook: {
      type: String,
    },
    gmail: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

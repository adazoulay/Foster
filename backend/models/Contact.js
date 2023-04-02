const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    company: {
      type: String,
    },
    imgUrl: {
      type: String,
    },
    // chat: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: false,
    //   ref: "Chat",
    // },
    lastUpdated: {
      //! Finish
      type: Date,
      default: Date.now,
    },
    relationship: {
      type: Number,
    },
    notes: {
      type: String,
    },
    phone: {
      type: Number,
      required: false,
    },
    email: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    tracked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);

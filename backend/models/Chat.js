const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Contact",
    },
    messages: [
      {
        from: {
          type: Boolean,
        },
        message: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);

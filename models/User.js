const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  avatar: {
    publicId: String,
    url: String,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);

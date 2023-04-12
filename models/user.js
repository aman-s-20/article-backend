const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  password: {
    type: String,
    required: [true, "password is required."],
  },
  age : {
    type: String,
  }
});

const User = new mongoose.model("user", UserSchema);

module.exports = User;
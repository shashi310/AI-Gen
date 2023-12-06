const mongoose = require("mongoose");

//schema
const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    location: String,
    skill: String,
    bio:String,
    status: String,
    course:Array,
  },
  {
    versionKey: false,
  }
);

//model
const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};

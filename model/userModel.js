const Mongoose = require("../db/connection");

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  count: Number,
  log: []
});

const User = Mongoose.model("User", userSchema);

module.exports = {
  User,
};

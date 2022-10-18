const Mongoose = require("./connection");

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
});

const User = Mongoose.model("User", userSchema);

module.exports = {
  User,
};

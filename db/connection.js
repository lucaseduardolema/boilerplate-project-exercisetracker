require("dotenv").config();
const Mongoose = require("mongoose");

Mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connection successful");
  })
  .catch(() => console.error("Database connection error"));

module.exports = Mongoose;

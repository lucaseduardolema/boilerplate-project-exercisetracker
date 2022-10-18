const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const apiUsersRoute = require("./routes/apiUserRoute");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", apiUsersRoute);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

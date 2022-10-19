const express = require("express");
const {
  createUser,
  addExercises,
  getAll,
  getLogs,
} = require("../controller/userController");

const router = express.Router();

router.post("/", createUser);

router.post("/:id/exercises", addExercises);

router.get("/:id/logs", getLogs);

router.get("/", getAll);

module.exports = router;

const express = require("express");
const { createUser, updateUser, getAll } = require("../controller/userController");

const router = express.Router();

router.post("/", createUser);

router.post("/:id/exercises", updateUser);

router.get('/', getAll)

module.exports = router;

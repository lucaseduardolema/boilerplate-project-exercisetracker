const {
  createNewUser,
  updateUserById,
  getAllUsers,
  getLogById,
} = require("../model/userModel");

const createUser = (req, res) => {
  const { username } = req.body;

  createNewUser(username, (error, data) => {
    if (error) return res.status(404).json({ error });

    const { _id } = data;

    res.status(201).json({ _id, username });
  });
};

const addExercises = (req, res) => {
  const { description, duration, date } = req.body;
  const { id } = req.params

  const newDate = date
    ? new Date(date).toDateString()
    : new Date().toDateString();
  const newDuration = Number(duration);

  const info = {
    id,
    description,
    duration: newDuration,
    date: newDate,
  };

  updateUserById(info, (error, data) => {
    if (error) return res.status(404).json(error);

    const { _id, username } = data;

    res.status(200).json({
      _id,
      username,
      date: newDate,
      duration: newDuration,
      description,
    });
  });
};

const getAll = (_req, res) => {
  getAllUsers((error, data) => {
    if (error) return res.status(404).json(error);

    const response = data.map(({ _id, username }) => ({
      _id,
      username,
    }));

    res.status(200).json(response);
  });
};

const getLogs = (req, res) => {
  const { id } = req.params;

  getLogById(id, (error, data) => {
    if (error) return res.status(404).json(error);

    const { _id, username, count, log } = data;

    res.status(200).json({ _id, username, count, log });
  });
};

module.exports = {
  createUser,
  addExercises,
  getAll,
  getLogs,
};

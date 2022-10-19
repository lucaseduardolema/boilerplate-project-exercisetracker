const {
  createNewUser,
  updateUserById,
  getAllUsers,
} = require("../model/userModel");

const createUser = (req, res) => {
  const { username } = req.body;

  createNewUser(username, (error, data) => {
    if (error) return res.status(404).json({ error });

    const { _id } = data;

    res.status(201).json({ _id, username });
  });
};

const updateUser = (req, res) => {
  const { id, description, duration, date } = req.body;

  const newDate = new Date(date).toDateString();
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
      username,
      description,
      duration: newDuration,
      date: newDate,
      _id,
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

module.exports = {
  createUser,
  updateUser,
  getAll,
};

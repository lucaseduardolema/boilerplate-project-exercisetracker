const {
  createNewUser,
  updateUserById,
  getAllUsers,
  getLogById,
} = require("../services/userService");

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
  const { id } = req.params;

  let dataFormated

  if (date) {
    dataFormated = date.split('-').join('/')
  }


  const newDate = dataFormated
    ? new Date(dataFormated).toDateString()
    : new Date().toDateString();
  const newDuration = Number(duration);

  const info = {
    id,
    description,
    duration: newDuration,
    date: newDate,
  };

  updateUserById(info, (error, data) => {
    console.log(error);
    if (error) return res.status(404).json(error);

    const { _id, username, log } = data;
    const index = log.length - 1;
    const obj = log[index];
    
    res.status(200).json({
      _id: _id.toString(),
      username,
      date: obj.date,
      duration: obj.duration,
      description: obj.description
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

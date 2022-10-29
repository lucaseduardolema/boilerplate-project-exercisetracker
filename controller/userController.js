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

  let dataFormated;

  if (date) {
    dataFormated = date.split("-").join("/");
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
    if (error) return res.status(404).json(error);

    const { _id, username, log } = data;
    const index = log.length - 1;
    const obj = log[index];

    res.status(200).json({
      _id: _id.toString(),
      username,
      date: obj.date,
      duration: obj.duration,
      description: obj.description,
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
  const { from, to, limit } = req.query;
  const startDate = new Date(from);
  const endDate = new Date(to);

  getLogById(id, (error, data) => {
    if (error) return res.status(404).json(error);

    const { _id, username, count, log } = data;
    const logSorted = log.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (limit === '0') {
      return res.status(200).json({ _id, username, count, log: logSorted });
    }

    if (from && !to && !limit) {
      const newLog = logSorted.filter((log) => new Date(log.date) >= startDate);
      const respFrom = new Date(from.replace(/-/g, "/")).toDateString();
      return res
        .status(200)
        .json({
          _id,
          username,
          from: respFrom,
          count: newLog.length,
          log: newLog,
        });
    }

    if (from && to && !limit) {
      const respFrom = new Date(from.replace(/-/g, "/")).toDateString();
      const respTo = new Date(to.replace(/-/g, "/")).toDateString();

      const newLog = logSorted.filter(
        (log) =>
          new Date(log.date) >= startDate && new Date(log.date) <= endDate
      );
      return res
        .status(200)
        .json({
          _id,
          username,
          from: respFrom,
          to: respTo,
          count: newLog.length,
          log: newLog,
        });
    }

    if (from && to && limit) {
      const respFrom = new Date(from.replace(/-/g, "/")).toDateString();
      const respTo = new Date(to.replace(/-/g, "/")).toDateString();
      const newLog = logSorted
        .filter(
          (log) =>
            new Date(log.date) >= startDate && new Date(log.date) <= endDate
        )
        .splice(0, Number(limit));
      return res
        .status(200)
        .json({
          _id,
          username,
          from: respFrom,
          to: respTo,
          count: newLog.length,
          log: newLog,
        });
    }

    if (!from && to && !limit) {
      const respTo = new Date(to.replace(/-/g, "/")).toDateString();
      const newLog = logSorted.filter((log) => new Date(log.date) <= endDate)
      return res.status(200).json({
        _id,
        username,
        to: respTo,
        count: newLog.length,
        log: newLog,
      });
    }

    if (!from && !to && limit) {
      const newLog = logSorted.splice(0, Number(limit));
      return res.status(200).json({
        _id,
        username,
        count: newLog.length,
        log: newLog,
      });
    }

    if (!from && to && limit) {
      const respTo = new Date(to.replace(/-/g, "/")).toDateString();
      const newLog = logSorted.filter((log) => new Date(log.date) <= endDate).splice(0, Number(limit));
      return res.status(200).json({
        _id,
        username,
        to: respTo,
        count: newLog.length,
        log: newLog,
      });
    }

    res.status(200).json({ _id, username, count, log: logSorted });
  });
};

module.exports = {
  createUser,
  addExercises,
  getAll,
  getLogs,
};

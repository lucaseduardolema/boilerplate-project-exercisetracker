const { User } = require("../db/schemas");

const createNewUser = (username, done) => {
  const user = new User({
    username,
    count: 0,
    log: [],
  });

  user.save((err, data) => {
    done(err, data);
  });
};

const updateUserById = (info, done) => {
  const { id, ...rest } = info;

  User.findById({ _id: id }, (error, data) => {
    if (error) return done(error, null);

    data.log.push(rest);
    data.count = data.count + 1;

    data.save((err, newData) => done(err, newData));
  });
};

const getAllUsers = (done) => {
  User.find((error, data) => done(error, data));
};

const getLogById = (id, done) => {
  User.findById({ _id: id }, (error, data) => done(error, data));
};

module.exports = {
  createNewUser,
  updateUserById,
  getAllUsers,
  getLogById,
};

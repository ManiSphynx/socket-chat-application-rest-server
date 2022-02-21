const { request, response } = require("express");

const getUsers = (req = request, res = response) => {
  res.status(400).json({ msg: "que wea" });
};

const createUsers = (req = request, res = response) => {
  res.status(400).json({ msg: "que wea" });
};

const updateUsers = (req = request, res = response) => {
  res.status(400).json({ msg: "que wea" });
};

const deleteUsers = (req = request, res = response) => {
  res.status(400).json({ msg: "que wea" });
};

module.exports = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
};

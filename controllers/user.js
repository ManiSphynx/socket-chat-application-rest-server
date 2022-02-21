const { request, response } = require("express");

const createUsers = (req = request, res = response) => {
  const { nombre, edad } = req.body;

  res.status(400).json({ msg: "que wea", nombre, edad });
};
const getUsers = (req = request, res = response) => {
  const { q, nombre, apikey } = req.query;
  res.status(400).json({ msg: "que wea", q, nombre, apikey });
};

const updateUsers = (req = request, res = response) => {
  const { id } = req.params;
  res.status(400).json({ msg: "que wea", id });
};

const deleteUsers = (req = request, res = response) => {
  res.status(400).json({ msg: "que wea" });
};

module.exports = {
  createUsers,
  getUsers,
  updateUsers,
  deleteUsers,
};

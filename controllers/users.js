const { request, response } = require("express");
const { createUserLogic } = require("../services/users");

const createUsers = async (req = request, res = response) => {
  try {
    const createUser = await createUserLogic(req, res);

    if (createUser) {
      res.json({
        msg: "usuario creado con exito",
        createUser,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
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

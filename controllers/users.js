const { request, response } = require("express");
const { createUserLogic, updateUserLogic } = require("../services/users");

const createUsers = async (req = request, res = response) => {
  try {
    const createUser = await createUserLogic(req, res);

    res.status(201).json({
      msg: "usuario creado con exito",
      createUser,
    });
  } catch (error) {
    res.status(400).json({ msg: error });
    throw new Error(error);
  }
};

const getUsers = (req = request, res = response) => {
  const { q, nombre, apikey } = req.query;
  res.status(400).json({ msg: "que wea", q, nombre, apikey });
};

const updateUsers = async (req = request, res = response) => {
  try {
    const updateUser = await updateUserLogic(req, res);
    res.status(200).json({ msg: "Usuario actualizado con exito", updateUser });
  } catch (error) {
    res.status(400).json({ msg: error });
    throw new Error(error);
  }
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

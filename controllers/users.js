const { request, response } = require("express");
const {
  createUserLogic,
  updateUserLogic,
  getUsersLogic,
  deleteUserLogic,
} = require("../services/users");

const createUsers = async (req = request, res = response) => {
  try {
    const createUser = await createUserLogic(req, res);

    res.status(201).json({
      msg: "usuario creado con exito",
      createUser,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error al crear usuario" });
    throw new Error(error);
  }
};

const getUsers = async (req = request, res = response) => {
  try {
    const getUsuarios = await getUsersLogic(req);
    if (getUsuarios) {
      const [listaUsuarios, totalUsuarios] = getUsuarios;
      res.status(200).json({ totalUsuarios, listaUsuarios });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener usuarios" });
    throw new Error(error);
  }
};

const updateUsers = async (req = request, res = response) => {
  try {
    const updateUser = await updateUserLogic(req, res);
    res.status(200).json({ msg: "Usuario actualizado con exito", updateUser });
  } catch (error) {
    res.status(500).json({ msg: "Error al actualizar usuario" });
    throw new Error(error);
  }
};

const deleteUsers = async (req = request, res = response) => {
  try {
    const { userDel, userAuth } = await deleteUserLogic(req);

    if (userDel && userAuth) {
      res
        .status(200)
        .json({ msg: "Usuario Eliminado con exito", userDel, userAuth });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al eliminar usuario" });
    throw new Error(error);
  }
};

module.exports = {
  createUsers,
  getUsers,
  updateUsers,
  deleteUsers,
};

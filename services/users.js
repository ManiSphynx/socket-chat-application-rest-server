const Usuario = require("../models/user");
const { passwordHash } = require("../helpers/passwordHash");

const createUserLogic = async (request, response) => {
  try {
    const { nombre, correo, password, rol } = request.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    if (usuario) {
      usuario.password = passwordHash(password);
      await usuario.save();
    }

    return usuario;
  } catch (error) {
    throw new Error(error);
  }
};

const updateUserLogic = async (request, response) => {
  const { id } = request.params;
  const { _id, password, google, correo, ...rest } = request.body;

  if (password) {
    rest.password = passwordHash(password);
  }

  return await Usuario.findByIdAndUpdate(id, rest)
    .then(async (result) => {
      return await Usuario.findOne(result._id);
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const getUsersLogic = async (request) => {
  try {
    const { limite = 5, desde = 0 } = request.query;

    if (Number(limite) && Number(desde)) {
      return await Promise.all([
        Usuario.find({ estado: true }).skip(Number(desde)).limit(Number(limite)),
        Usuario.countDocuments({ estado: true }),
      ]);
    } else {
      return await Promise.all([
        Usuario.find({ estado: true }),
        Usuario.countDocuments({ estado: true }),
      ]);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUserLogic = async (request) => {
  const { id } = request.params;

  return await Usuario.findByIdAndUpdate(id, { estado: false });
};

module.exports = {
  createUserLogic,
  updateUserLogic,
  getUsersLogic,
  deleteUserLogic,
};

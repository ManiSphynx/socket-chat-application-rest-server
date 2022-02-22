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

module.exports = {
  createUserLogic,
  updateUserLogic,
};

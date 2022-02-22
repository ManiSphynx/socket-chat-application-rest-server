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

module.exports = {
  createUserLogic,
};

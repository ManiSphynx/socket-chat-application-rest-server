const Usuario = require("../models/user");
const { comparePassword } = require("../helpers/passwordHash");
const { loginConstants } = require("../constants/constantsLibrary");
const jwt = require("../helpers/jwtGenerator");

const loginLogic = async (request, response) => {
  try {
    const { correo, password } = request.body;
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return response.status(400).json({ msg: loginConstants });
    }

    if (!usuario.estado) {
      return response.status(400).json({ msg: loginConstants });
    }

    const verifyPassword = comparePassword(password, usuario.password);

    if (!verifyPassword) {
      return response.status(400).json({ msg: loginConstants });
    }

    const token = await jwt(usuario.id);

    return { usuario, token };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginLogic,
};

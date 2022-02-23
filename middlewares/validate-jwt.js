const jsonWebToken = require("jsonwebtoken");
const {
  unauthorizedUser,
  invalidToken,
} = require("../constants/constantsLibrary");
const Usuario = require("../models/user");

const validateJWT = async (request, response, next) => {
  const token = request.header("x-token");
  const secret = process.env.SECRET;

  if (!token) {
    return response.status(401).json({
      msg: unauthorizedUser,
    });
  }

  try {
    const { uid } = jsonWebToken.verify(token, secret);
    const usuario = await Usuario.findById(uid);

    if (!usuario.estado) {
      return response.status(401).json({
        msg: unauthorizedUser,
      });
    }

    if (usuario) {
      request.usuario = usuario;
    }

    next();
  } catch (error) {
    console.log(error);
    return response.status(401).json({
      msg: invalidToken,
    });
  }
};

module.exports = validateJWT;

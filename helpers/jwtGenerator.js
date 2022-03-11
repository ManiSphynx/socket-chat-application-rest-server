const jsonWebToken = require("jsonwebtoken");
const { Usuario } = require("../models");

const jwt = (uid = "") => {
  return new Promise((resolve, reject) => {
    const secret = process.env.SECRET;
    const payload = { uid };

    jsonWebToken.sign(
      payload,
      secret,
      {
        expiresIn: "4d",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Ocurrio un error al generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const CheckJwt = async (token = "") => {
  try {
    if (token.length < 10) {
      return null;
    }
    const { uid } = jsonWebToken.verify(token, process.env.SECRET);

    const usuario = await Usuario.findById(uid);

    if (usuario && usuario.estado) {
      return usuario;
    } else {
      null;
    }
  } catch (error) {
    return null;
  }
};

module.exports = { jwt, CheckJwt };

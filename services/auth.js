const Usuario = require("../models/user");
const { comparePassword } = require("../helpers/passwordHash");
const {
  loginConstants,
  unauthorizedUser,
} = require("../constants/constantsLibrary");
const { jwt } = require("../helpers/jwtGenerator");
const { googleVerify } = require("../helpers/google-verify");

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

const googleLoginLogic = async (request, response) => {
  const { id_token } = request.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);
    let usuario = await Usuario.findOne({ correo: email });

    if (!usuario) {
      const params = {
        nombre: name,
        correo: email,
        password: "google login",
        img: picture,
        google: true,
      };

      usuario = new Usuario(params);
      usuario.save();
    } else {
      const { nombre, correo, img } = usuario;

      if (nombre !== name || correo !== email || img !== picture) {
        const params = {
          nombre: name,
          correo: email,
          password: "google login",
          img: picture,
          google: true,
        };

        usuario = Usuario.findOneAndUpdate(_id, params);
      }
    }

    if (!usuario.estado) {
      return response.status(401).json({
        msg: unauthorizedUser,
      });
    }

    const token = await jwt(usuario.id);

    return { usuario, token };
  } catch (error) {
    console.log(error);
  }
};

const refreshLogic = async (request) => {
  const { usuario } = request;
  const token = await jwt(usuario.id);

  return { usuario, token };
};

module.exports = {
  loginLogic,
  googleLoginLogic,
  refreshLogic,
};

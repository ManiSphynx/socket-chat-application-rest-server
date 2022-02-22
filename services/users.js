const Usuario = require("../models/user");
const { passwordHash } = require("../helpers/passwordHash");

const createUserLogic = async (request, response) => {
  try {
    const { nombre, correo, password, rol } = request.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    if (usuario) {
      const existeEmail = await Usuario.findOne({ correo });

      if (existeEmail) {
        return response.status(400).json({
          error: "El correo ya se encuentra registrado",
        });
      }

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

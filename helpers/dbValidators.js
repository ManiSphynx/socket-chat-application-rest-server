const Role = require("../models/role");
const Usuario = require("../models/user");

const validarRol = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const existeEmail = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(
      `El email ${correo} ya esta registrado en la base de datos`
    );
  }
};

const existeUsuario = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no esta registrado en la base de datos`);
  }
};

module.exports = { validarRol, existeEmail, existeUsuario };

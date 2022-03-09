const { validationResult } = require("express-validator");

const validarCampos = (request, response, next) => {
  const errores = validationResult(request);
  if (!errores.isEmpty()) {
    return response.status(400).json(errores);
  }

  next();
};

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  if (!colecciones.includes(coleccion)) {
    throw new Error("Este coleccion no esta permitida");
  }

  return true;
};

module.exports = {
  validarCampos,
  coleccionesPermitidas,
};

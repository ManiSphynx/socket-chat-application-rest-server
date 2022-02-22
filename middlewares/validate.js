const { validationResult } = require("express-validator");

const validarCampos = (request, response, next) => {
  const errores = validationResult(request);
  if (!errores.isEmpty()) {
    return response.status(400).json(errores);
  }

  next();
};

module.exports = {
  validarCampos,
};

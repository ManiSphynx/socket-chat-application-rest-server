const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validate");
const { validarRol } = require("./dbValidators");

const validateUser = [
  check("nombre", "El nombre es obligatorio").not().isEmpty().isString(),
  check("password","El password es obligatorio y debe contener más de 6 caracteres").isLength({ min: 6 }),
  check("correo", "Este formato de correo no es valido").isEmail(),
  check("rol").custom(validarRol),
  validarCampos,
];

module.exports = { validateUser };

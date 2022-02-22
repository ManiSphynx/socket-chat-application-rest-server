const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validate");
const { validarRol, existeEmail, existeUsuario } = require("./dbValidators");

const validateCreateUser = [
  check("nombre", "El nombre es obligatorio").not().isEmpty().isString(),
  check(
    "password",
    "El password es obligatorio y debe contener más de 6 caracteres"
  ).isLength({ min: 6 }),
  check("correo", "Este formato de correo no es valido").isEmail(),
  check("correo").custom(existeEmail),
  check("rol").custom(validarRol),
  validarCampos,
];
const validateUpdateUser = [
  check("id", "No es un id valido").isMongoId(),
  check("id").custom(existeUsuario),
  check("rol").custom(validarRol),
  validarCampos,
];

const validateDeleteUser = [
  check("id", "No es un id valido").isMongoId(),
  check("id").custom(existeUsuario),
  validarCampos,
];

module.exports = { validateCreateUser, validateUpdateUser, validateDeleteUser };

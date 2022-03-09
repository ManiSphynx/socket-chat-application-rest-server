const { check } = require("express-validator");
const {
  validarCampos,
  coleccionesPermitidas,
} = require("../middlewares/validate");
const existeCategoria = require("../middlewares/validate-category");
const existeProducto = require("../middlewares/validate-product");
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

const validateLogin = [
  check("correo", "El correo es obligatorio").isEmail(),
  check("password", "El password es obligatorio").not().isEmpty(),
  validarCampos,
];

const validateGoogleLogin = [
  check("id_token", "El token es obligatorio").not().isEmpty(),
  validarCampos,
];

const validateCategory = [
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  validarCampos,
];

const validateCategoryID = [
  check("id", "No es un id valido").isMongoId(),
  check("id").custom(existeCategoria),
  validarCampos,
];
const validateProduct = [
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("categoria", "La categoria es obligatoria").not().isEmpty(),
  validarCampos,
];

const validateProductID = [
  check("id", "No es un id valido").isMongoId(),
  check("id").custom(existeProducto),
  validarCampos,
];

const validateUpdateFile = [
  check("id", "No es un id valido").isMongoId(),
  check("coleccion").custom((c) =>
    coleccionesPermitidas(c, ["usuarios", "productos"])
  ),
  validarCampos,
];

module.exports = {
  validateCreateUser,
  validateUpdateUser,
  validateDeleteUser,
  validateLogin,
  validateGoogleLogin,
  validateCategory,
  validateCategoryID,
  validateProduct,
  validateProductID,
  validateUpdateFile,
};

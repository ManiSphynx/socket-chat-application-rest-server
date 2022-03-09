const { Router } = require("express");
const {
  fileUpload,
  actualizarImagen,
  mostrarImagen,
} = require("../controllers/uploads");
const { validateUpdateFile } = require("../helpers/middlewareValidators");

const router = Router();

router.post("/", fileUpload);
router.put("/:coleccion/:id", validateUpdateFile, actualizarImagen);
router.get("/:coleccion/:id", validateUpdateFile, mostrarImagen);

module.exports = router;

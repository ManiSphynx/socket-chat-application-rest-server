const { Router } = require("express");
const { validateJWT } = require("../middlewares");
const { createCategory } = require("../controllers");
const { validateCategory } = require("../helpers/middlewareValidators");
const router = Router();

/* Routes definitions */

// Obtener todas las categorias - publico get
router.get("/", (req, res) => console.log("work"));

//get:id obtener una sola categoria por id - publico
router.get("/:id", (req, res) => console.log("work"));

// post  crear categoia -privado solo con token
router.post("/", validateJWT, validateCategory, createCategory);

//PUT:id actualizar registro por id privado cualquiera con token valido
router.put("/:id", (req, res) => console.log("work"));

//DELETE:id borrar una categoria solo usuarios administrado marcar estado de activo a inactivo
router.delete("/:id", (req, res) => console.log("work"));

module.exports = router;

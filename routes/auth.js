const { Router } = require("express");
const { login } = require("../controllers");
const { validateLogin } = require("../helpers/middlewareValidators");
const router = Router();

router.post("/login", validateLogin, login);

module.exports = router;

const { Router } = require("express");
const { login, googleLogin } = require("../controllers");
const {
  validateLogin,
  validateGoogleLogin,
} = require("../helpers/middlewareValidators");
const router = Router();

router.post("/login", validateLogin, login);
router.post("/google", validateGoogleLogin, googleLogin);

module.exports = router;

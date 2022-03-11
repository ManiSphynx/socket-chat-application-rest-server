const { Router } = require("express");
const { login, googleLogin, tokenRefresh } = require("../controllers");
const {
  validateLogin,
  validateGoogleLogin,
} = require("../helpers/middlewareValidators");
const { validateJWT } = require("../middlewares");
const router = Router();

router.post("/login", validateLogin, login);
router.post("/google", validateGoogleLogin, googleLogin);
router.get("/", validateJWT, tokenRefresh);

module.exports = router;

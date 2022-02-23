const { Router } = require("express");
const { loginController } = require("../controllers");
const router = Router();

router.post("/login", loginController.login);

module.exports = router;

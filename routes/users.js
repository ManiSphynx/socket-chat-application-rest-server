const { Router } = require("express");
const { userController } = require("../controllers");
const { validateUser } = require("../helpers/middlewareValidators");
const router = Router();

router.post("/", validateUser, userController.createUsers);

router.get("/", userController.getUsers);

router.put("/:id", userController.updateUsers);

router.delete("/:id", userController.deleteUsers);

module.exports = router;

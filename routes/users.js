const { Router } = require("express");
const { userController } = require("../controllers");
const {
  validateCreateUser,
  validateUpdateUser,
} = require("../helpers/middlewareValidators");
const router = Router();

router.post("/", validateCreateUser, userController.createUsers);

router.get("/", userController.getUsers);

router.put("/:id", validateUpdateUser, userController.updateUsers);

router.delete("/:id", userController.deleteUsers);

module.exports = router;

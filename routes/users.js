const { Router } = require("express");
const { userController } = require("../controllers");
const {
  validateCreateUser,
  validateUpdateUser,
  validateDeleteUser,
} = require("../helpers/middlewareValidators");
const validateJWT = require("../middlewares/validate-jwt");
const { onlyAdminRole } = require("../middlewares/validate-rol");
const router = Router();

router.post("/", validateCreateUser, userController.createUsers);

router.get("/", userController.getUsers);

router.put("/:id", validateUpdateUser, userController.updateUsers);

router.delete(
  "/:id",
  validateJWT,
  onlyAdminRole,
  validateDeleteUser,
  userController.deleteUsers
);

module.exports = router;

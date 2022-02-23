const { Router } = require("express");
const router = Router();

/* Validators and Middleware importations */
const {
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers");
const {
  validateCreateUser,
  validateUpdateUser,
  validateDeleteUser,
} = require("../helpers/middlewareValidators");
const { onlyAdminRole, haveRol, validateJWT } = require("../middlewares");

/* Routes definitions */
router.post("/", validateCreateUser, createUsers);

router.get("/", getUsers);

router.put("/:id", validateUpdateUser, updateUsers);

router.delete(
  "/:id",
  validateJWT,
  onlyAdminRole,
  validateDeleteUser,
  deleteUsers
);

module.exports = router;

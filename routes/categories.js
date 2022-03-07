const { Router } = require("express");
const { validateJWT, onlyAdminRole } = require("../middlewares");
const {
  createCategory,
  GetAllCategories,
  GetCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers");
const {
  validateCategory,
  validateCategoryID,
} = require("../helpers/middlewareValidators");
const router = Router();

/* Routes definitions */
router.get("/", GetAllCategories);
router.get("/:id", validateCategoryID, GetCategoryById);
router.post("/", validateJWT, validateCategory, createCategory);
router.put("/:id", validateJWT, validateCategoryID, updateCategory);
router.delete(
  "/:id",
  validateJWT,
  onlyAdminRole,
  validateCategoryID,
  deleteCategory
);

module.exports = router;

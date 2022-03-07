const { Router } = require("express");
const { validateJWT, onlyAdminRole } = require("../middlewares");
const {
  createProduct,
  GetAllProducts,
  GetProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const {
  validateProduct,
  validateProductID,
} = require("../helpers/middlewareValidators");
const router = Router();

/* Routes definitions */
router.get("/", GetAllProducts);
router.get("/:id", validateProductID, GetProductById);
router.post("/", validateJWT, validateProduct, createProduct);
router.put("/:id", validateJWT, validateProductID, updateProduct);
router.delete(
  "/:id",
  validateJWT,
  onlyAdminRole,
  validateProductID,
  deleteProduct
);

module.exports = router;

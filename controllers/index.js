const userController = ({
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/users"));

const loginController = ({ login } = require("../controllers/auth"));

const categoryController = ({
  createCategory,
  GetAllCategories,
  GetCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories"));

const productController = ({
  createProduct,
  GetAllProducts,
} = require("../controllers/products"));

const searchController = ({ search } = require("../controllers/search"));

module.exports = {
  ...userController,
  ...loginController,
  ...categoryController,
  ...productController,
  ...searchController,
};

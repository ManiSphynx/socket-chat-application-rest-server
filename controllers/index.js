const userController = ({
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/users"));

const loginController = ({ login } = require("../controllers/auth"));

const categoryController = ({
  createCategory,
} = require("../controllers/categories"));

module.exports = {
  ...userController,
  ...loginController,
  ...categoryController,
};

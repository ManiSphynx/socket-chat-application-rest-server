const userController = ({
  getUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} = require("../controllers/users"));

const loginController = ({ login } = require("../controllers/auth"));

module.exports = {
  ...userController,
  ...loginController,
};

const jwtValidate = ({ validateJWT } = require("../middlewares/validate-jwt"));
const rolValidate = ({
  onlyAdminRole,
  haveRol,
} = require("../middlewares/validate-rol"));

module.exports = {
  ...jwtValidate,
  ...rolValidate,
};

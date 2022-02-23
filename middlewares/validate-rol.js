const {
  noTokenHeader,
  unauthorizedUser,
} = require("../constants/constantsLibrary");

const onlyAdminRole = (request, response, next) => {
  if (!request.usuario) {
    return response.status(500).json({ msg: noTokenHeader });
  }

  const { rol } = request.usuario;

  if (rol !== "ADMIN_ROLE") {
    return response.status(401).json({
      msg: unauthorizedUser,
    });
  }

  next();
};

const haveRol = (...roles) => {
  return (request, response, next) => {
    if (!request.usuario) {
      return response.status(500).json({ msg: noTokenHeader });
    }

    const { rol } = request.usuario;

    if (!roles.includes(rol)) {
      return response.status(401).json({
        msg: unauthorizedUser,
      });
    }

    next();
  };
};

module.exports = { onlyAdminRole, haveRol };

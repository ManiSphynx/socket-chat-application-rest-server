const encript = require("bcryptjs");

exports.passwordHash = (password) => {
  const salt = encript.genSaltSync(15);
  return encript.hashSync(password, salt);
};

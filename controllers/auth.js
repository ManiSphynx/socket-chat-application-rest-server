const { request, response } = require("express");

const login = (req = request, res = response) => {
  res.json({ mgs: "ok" });
};

module.exports = {
  login,
};

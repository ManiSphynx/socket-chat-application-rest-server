const { request, response } = require("express");
const { loginLogic } = require("../services/auth");

const login = async (req = request, res = response) => {
  try {
    const { usuario, token } = await loginLogic(req, res);

    if (usuario && token) {
      res.status(200).json({ usuario, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mgs: "No se pudo iniciar sesión" });
  }
};

module.exports = {
  login,
};

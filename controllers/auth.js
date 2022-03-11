const { request, response } = require("express");
const {
  loginLogic,
  googleLoginLogic,
  refreshLogic,
} = require("../services/auth");

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

const googleLogin = async (req = request, res = response) => {
  try {
    const { usuario, token } = await googleLoginLogic(req, res);

    if (usuario && token) {
      res.status(200).json({ usuario, token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mgs: "No se pudo iniciar sesión con Google" });
  }
};

const tokenRefresh = async (req = request, res = response) => {
  try {
    const user = await refreshLogic(req, res);

    res.status(200).json({ message: "success", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mgs: "No se pudo renovar el token" });
  }
};

module.exports = {
  login,
  googleLogin,
  tokenRefresh,
};

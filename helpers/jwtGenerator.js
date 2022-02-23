const jsonWebToken = require("jsonwebtoken");

const jwt = (uid = "") => {
  return new Promise((resolve, reject) => {
    const secret = process.env.SECRET;
    const payload = { uid };

    jsonWebToken.sign(
      payload,
      secret,
      {
        expiresIn: "4d",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Ocurrio un error al generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = jwt;

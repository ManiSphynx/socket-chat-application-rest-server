const { CheckJwt } = require("../helpers/jwtGenerator");

const socketController = async (socket) => {
  const user = await CheckJwt(socket.handshake.headers["x-token"]);

  if (!user) {
    return socket.disconnect();
  }

  console.log("conectado");
};

module.exports = socketController;

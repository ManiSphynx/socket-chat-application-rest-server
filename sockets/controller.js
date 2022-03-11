const { CheckJwt } = require("../helpers/jwtGenerator");
const { ChatMessage } = require("../models");

const chatMessages = new ChatMessage();

const socketController = async (socket, io) => {
  const user = await CheckJwt(socket.handshake.headers["x-token"]);

  if (!user) {
    return socket.disconnect();
  }

  /* Connect the user */
  chatMessages.addUser(user);
  io.emit("active-users", chatMessages.usersArray);
  socket.emit("receive-messages", chatMessages.lastMessages);

  /* private messages */
  socket.join(user.id);

  /* Clean the user if is disconnect */
  socket.on("disconnect", () => {
    chatMessages.disconectUser(user.id);
    io.emit("active-users", chatMessages.usersArray);
  });

  socket.on("send-message", ({ message, uid }) => {
    if (uid) {
      socket.to(uid).emit("private-message", { de: user.nombre, message });
    } else {
      chatMessages.addMessage(user.id, user.nombre, message);
      io.emit("receive-messages", chatMessages.lastMessages);
    }
  });
};

module.exports = socketController;

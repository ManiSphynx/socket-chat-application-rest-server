const express = require("express");
const path = require("path");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.get("/", (request, response) => {
      response.send("hello world");
    });
  }

  middlewares() {
    this.app.use(express.static(path.join(__dirname, "../", "public")));
  }

  listener() {
    this.app.listen(this.port, () => {
      console.log(`El proyecto esta corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;

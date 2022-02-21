const express = require("express");
const path = require("path");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user"));
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, "../", "public")));
  }

  listener() {
    this.app.listen(this.port, () => {
      console.log(`El proyecto esta corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;

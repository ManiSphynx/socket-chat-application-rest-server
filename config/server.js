const express = require("express");
const path = require("path");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/api/auth";
    this.usersPath = "/api/users";
    this.conectDB();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usersPath, require("../routes/users"));
  }

  async conectDB() {
    await dbConnection();
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

const express = require("express");
const path = require("path");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
    };
    this.conectDB();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.users, require("../routes/users"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.categories, require("../routes/categories"));
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

const Categoria = require("../models/category");

const existeCategoria = async (id) => {
  const categoriaDB = await Categoria.findById(id);

  if (!categoriaDB) {
    throw new Error("El id no es valido");
  }
};

module.exports = existeCategoria;

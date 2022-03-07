const Categoria = require("../models/category");

const existeCategoria = async (id) => {
  const categoriaDB = await Categoria.findById(id);

  if (!categoriaDB) {
    throw new Error("El id no es valido");
  }

  return categoriaDB;
};

module.exports = existeCategoria;

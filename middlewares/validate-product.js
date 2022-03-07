const { Producto } = require("../models");

const existeProducto = async (id) => {
  const productoDB = await Producto.findById(id);

  if (!productoDB) {
    throw new Error("El id no es valido");
  }
};

module.exports = existeProducto;

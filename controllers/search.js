const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");

const CollectionsAllowed = ["usuarios", "categorias", "productos", "role"];

const searchUsers = async (termino = "", res = response) => {
  const mongoId = ObjectId.isValid(termino);

  if (mongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({ results: usuario ? [usuario] : [] });
  }

  const regexp = new RegExp(termino, "i");

  const usuarios = await Usuario.find({
    $or: [{ nombre: regexp }, { email: regexp }],
    $and: [{ estado: true }],
  });

  res.json({ results: usuarios });
};
const searchCategories = async (termino = "", res = response) => {
  const mongoId = ObjectId.isValid(termino);

  if (mongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({ results: categoria ? [categoria] : [] });
  }

  const regexp = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regexp,
    estado: true,
  });

  res.json({ results: categorias });
};

const searchProducts = async (termino = "", res = response) => {
  const mongoId = ObjectId.isValid(termino);

  if (mongoId) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    );
    return res.json({ results: producto ? [producto] : [] });
  }

  const regexp = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regexp,
    estado: true,
  }).populate("categoria", "nombre");

  res.json({ results: productos });
};

const search = async (req = request, res = response) => {
  const { collection, termino } = req.params;

  if (!CollectionsAllowed.includes(collection)) {
    return res
      .status(400)
      .json({ message: `La coleccion ${collection} no existe` });
  }

  switch (collection) {
    case "usuarios":
      searchUsers(termino, res);
      break;

    case "categorias":
      searchCategories(termino, res);
      break;

    case "productos":
      searchProducts(termino, res);
      break;

    default:
      res
        .status(500)
        .json({ message: "Esta coleccion no esta incluida en las busquedas" });
      break;
  }
};

module.exports = {
  search,
};

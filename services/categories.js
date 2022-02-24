const { Categoria } = require("../models");

const createCategoryLogic = async (request, response) => {
  const nombre = request.body.nombre.toUpperCase();
  try {
    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
      response.status(400).json({
        msg: "La categoria ya existe",
      });
      return;
    }

    const data = {
      nombre,
      usuario: request.usuario._id,
    };

    const categoria = new Categoria(data);
    await categoria.save();

    return categoria;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createCategoryLogic };

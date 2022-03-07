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

const getCategoriesLogic = async () => {
  try {
    return await Promise.all([
      Categoria.find({ estado: true })
        .populate("usuario", "nombre", "Usuario", "estado:true")
        .exec(),
      Categoria.countDocuments({ estado: true }),
    ]);
  } catch (error) {
    console.log(error);
  }
};

const getCategoryLogic = async (id) => {
  try {
    return await Categoria.findById(id)
      .populate("usuario", "nombre", "Usuario", "estado:true")
      .exec();
  } catch (error) {
    console.log(error);
  }
};

const updateCategoryLogic = async (request, response) => {
  const id = request.params.id;
  const nombre = request.body.nombre.toUpperCase();

  try {
    const categoriaDB = await Categoria.findById(id);

    if (categoriaDB.estado === false) {
      response.status(404).json({
        msg: "La categoria no existe",
      });
      return;
    }

    categoriaDB.nombre = nombre;
    await categoriaDB.save();

    return categoriaDB;
  } catch (error) {
    console.log(error);
  }
};

const deleteCategoryLogic = async (request, response) => {
  const id = request.params.id;

  try {
    const categoriaDB = await Categoria.findById(id);

    if (categoriaDB.estado === false) {
      response.status(404).json({
        msg: "La categoria no existe",
      });
      return;
    }

    categoriaDB.estado = false;
    await categoriaDB.save();

    return categoriaDB;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCategoryLogic,
  getCategoriesLogic,
  getCategoryLogic,
  updateCategoryLogic,
  deleteCategoryLogic,
};

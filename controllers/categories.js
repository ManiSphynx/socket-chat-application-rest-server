const { request, response } = require("express");
const { createCategoryLogic } = require("../services/categories");

const createCategory = async (req = request, res = response) => {
  try {
    const category = await createCategoryLogic(req, res);

    if (category) {
      res.status(201).json({ msg: "Categoria creada con exito", category });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al crear una categoria" });
    throw new Error(error);
  }
};

module.exports = { createCategory };

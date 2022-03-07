const { request, response } = require("express");
const {
  createCategoryLogic,
  getCategoriesLogic,
  getCategoryLogic,
  updateCategoryLogic,
  deleteCategoryLogic,
} = require("../services/categories");

const createCategory = async (req = request, res = response) => {
  try {
    const category = await createCategoryLogic(req, res);

    if (category) {
      res.status(201).json({ msg: "Category Created with Success", category });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error creating a category" });
    throw new Error(error);
  }
};

const GetAllCategories = async (req = request, res = response) => {
  try {
    const [CategoryInformation, totalOfCategories] = await getCategoriesLogic();

    res
      .status(200)
      .json({ message: "success", totalOfCategories, CategoryInformation });
  } catch (error) {
    res.status(500).json({ msg: "Error getting the categories" });
    throw new Error(error);
  }
};

const GetCategoryById = async (req = request, res = response) => {
  try {
    const category = await getCategoryLogic(req.params.id);
    if (category) {
      res.status(200).json({ message: "success", category });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error getting the category" });
    throw new Error(error);
  }
};

const updateCategory = async (req = request, res = response) => {
  try {
    const category = await updateCategoryLogic(req, res);

    if (category) {
      res.status(200).json({ message: "success", category });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error updating the category" });
    throw new Error(error);
  }
};

const deleteCategory = async (req = request, res = response) => {
  try {
    const category = await deleteCategoryLogic(req, res);

    if (category) {
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error deleting the category" });
    throw new Error(error);
  }
};

// obtener categoria  populate method este metodo hace la relacion para obtener el ultimo usuario con el id

// actualizar categoria solo recibir el nombre y cambiar nombre de categoria etc

// borrar categoria cambiar el estado se necesita id

module.exports = {
  createCategory,
  GetAllCategories,
  GetCategoryById,
  updateCategory,
  deleteCategory,
};

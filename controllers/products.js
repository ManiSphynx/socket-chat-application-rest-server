const { request, response } = require("express");
const {
  createProductLogic,
  getAllProductsLogic,
  getProductLogic,
  updateProductLogic,
  deleteProductLogic,
} = require("../services/products");

const createProduct = async (req = request, res = response) => {
  try {
    const product = await createProductLogic(req, res);

    if (product) {
      res.status(201).json({ msg: "Product Created with Success", product });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error creating a product" });
    throw new Error(error);
  }
};

const GetAllProducts = async (req = request, res = response) => {
  try {
    const [ProductInformation, totalOfProducts] = await getAllProductsLogic();

    if (ProductInformation && totalOfProducts) {
      res.status(200).json({
        msg: "Products retrieved with Success",
        ProductInformation,
        totalOfProducts,
      });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving products" });
    throw new Error(error);
  }
};

const GetProductById = async (req = request, res = response) => {
  try {
    const product = await getProductLogic(req.params.id, res);
    if (product) {
      res.status(200).json({ message: "success", product });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error getting the product" });
    throw new Error(error);
  }
};

const updateProduct = async (req = request, res = response) => {
  try {
    const product = await updateProductLogic(req, res);

    if (product) {
      res.status(200).json({ message: "success", product });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error updating the product" });
    throw new Error(error);
  }
};

const deleteProduct = async (req = request, res = response) => {
  try {
    const product = await deleteProductLogic(req, res);

    if (product) {
      res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error deleting the product" });
    throw new Error(error);
  }
};

module.exports = {
  createProduct,
  GetAllProducts,
  GetProductById,
  updateProduct,
  deleteProduct,
};

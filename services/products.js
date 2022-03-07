const { Categoria } = require("../models");
const Producto = require("../models/product");

const createProductLogic = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();
  const precio = req.body?.precio;
  const categoria = req.body.categoria.toUpperCase();
  const descripcion = req.body?.descripcion;
  try {
    const productoDB = await Producto.findOne({ nombre });
    const categoriaDB = await Categoria.findOne({ nombre: categoria });

    if (!categoriaDB || categoriaDB.estado === false) {
      res.status(400).json({
        msg: "La categoria no existe",
      });
      return;
    }

    if (productoDB) {
      res.status(400).json({
        msg: "El prodycto ya existe",
      });
      return;
    }

    const data = {
      nombre,
      precio,
      categoria: categoriaDB._id,
      descripcion,
      usuario: req.usuario._id,
    };

    const producto = new Producto(data);
    await producto.save();

    return producto;
  } catch (error) {
    console.log(error);
  }
};

const getAllProductsLogic = async () => {
  try {
    return await Promise.all([
      Producto.find({ estado: true })
        .populate("usuario", "nombre", "Usuario")
        .populate("categoria", "nombre", "Categoria"),
      Producto.countDocuments({ estado: true }),
    ]);
  } catch (error) {
    console.log(error);
  }
};

const getProductLogic = async (id, response) => {
  try {
    const productoDB = await Producto.findById(id);

    if (productoDB.estado === false) {
      response.status(400).json({
        msg: "El producto no existe",
      });
      return;
    }

    return await Producto.findById(id)
      .populate("usuario", "nombre", "Usuario")
      .populate("categoria", "nombre", "Categoria");
  } catch (error) {
    console.log(error);
  }
};

const updateProductLogic = async (req, res) => {
  const _id = req.params.id;
  const nombre = req.body.nombre.toUpperCase();
  const precio = req.body?.precio;
  const categoria = req.body.categoria.toUpperCase();
  const descripcion = req.body?.descripcion;
  try {
    let productoDB = await Producto.findById({ _id });
    const productoDBDuplicate = await Producto.findOne({ nombre });
    const categoriaDB = await Categoria.findOne({ nombre: categoria });

    if (
      productoDBDuplicate?.nombre === nombre &&
      productoDBDuplicate?.precio === precio &&
      productoDBDuplicate?.categoria._id.toString() ===
        categoriaDB._id.toString() &&
      productoDBDuplicate?.descripcion === descripcion
    ) {
      res.status(400).json({
        msg: "Ya existe este producto",
      });
      return;
    }

    if (!categoriaDB || categoriaDB.estado === false) {
      res.status(400).json({
        msg: "La categoria no existe",
      });
      return;
    }

    if (!productoDB || productoDB.estado === false) {
      res.status(400).json({
        msg: "El producto no existe",
      });
      return;
    }

    const producto = await Producto.findByIdAndUpdate(_id, {
      nombre,
      precio,
      descripcion,
      categoria: categoriaDB._id,
      usuario: req.usuario._id,
    });

    const newProducto = await Producto.findById(producto._id)
      .populate("usuario", "nombre", "Usuario")
      .populate("categoria", "nombre", "Categoria");

    return newProducto;
  } catch (error) {
    console.log(error);
  }
};

const deleteProductLogic = async (req, res) => {
  const id = req.params.id;
  try {
    const productoDB = await Producto.findById(id);

    if (!productoDB || productoDB.estado === false) {
      response.status(400).json({
        msg: "El producto no existe",
      });
      return;
    }

    const producto = await Producto.findOneAndUpdate({ id }, { estado: false });

    return producto;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProductLogic,
  getAllProductsLogic,
  getProductLogic,
  updateProductLogic,
  deleteProductLogic,
};

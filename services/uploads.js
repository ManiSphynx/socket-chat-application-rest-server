const path = require("path");
const fs = require("fs");
var cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { subirArchivo } = require("../helpers/uploadFiles");
const { Usuario, Producto } = require("../models");

/* TODO: REFACTOR THIS */

const fileUploadLogic = async (request, response) => {
  if (!request.files || !request.files.archivo) {
    response.status(400).json({ message: "No files were uploaded" });
    return;
  }

  try {
    return await subirArchivo(request.files);
  } catch (error) {
    response.status(400).json({ message: error });
    return;
  }
};

const actualizarImagenLogic = async (request, response) => {
  /* TODO: refactorizar y crear un middleware */
  if (!request.files || !request.files.archivo) {
    response.status(400).json({ message: "No files were uploaded" });
    return;
  }

  let modelo;
  const { coleccion, id } = request.params;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        response.status(400).json({ message: "No existe el usuario" });
        return;
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        response.status(400).json({ message: "No existe el producto" });
        return;
      }
      break;

    default:
      response.status(500).json({ message: "Coleccion no incluida" });
      return;
  }

  if (modelo.img) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );

    if (fs.existsSync(pathImagen)) {
      fs.unlinkSync(pathImagen);
    }
  }

  modelo.img = await subirArchivo(request.files, coleccion);
  await modelo.save();

  return modelo;
};

const mostrarImagenLogic = async (request, response) => {
  let modelo;
  const { coleccion, id } = request.params;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        response.status(400).json({ message: "No existe el usuario" });
        return;
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        response.status(400).json({ message: "No existe el producto" });
        return;
      }
      break;

    default:
      response.status(500).json({ message: "Coleccion no incluida" });
      return;
  }

  if (modelo.img) {
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );

    if (fs.existsSync(pathImagen)) {
      return pathImagen;
    }
  } else {
    return path.join(__dirname, "../assets/no-image.jpg");
  }
};

const actualizarImagenLogicCloudinary = async (request, response) => {
  /* TODO: refactorizar y crear un middleware */
  if (!request.files || !request.files.archivo) {
    response.status(400).json({ message: "No files were uploaded" });
    return;
  }

  let modelo;
  const { coleccion, id } = request.params;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        response.status(400).json({ message: "No existe el usuario" });
        return;
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        response.status(400).json({ message: "No existe el producto" });
        return;
      }
      break;

    default:
      response.status(500).json({ message: "Coleccion no incluida" });
      return;
  }

  if (modelo.img) {
    /* eliminar imagen de clodinary por id */
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    await cloudinary.uploader.destroy(public_id);
  }

  /* subir imagen a cloudinary */
  const { secure_url } = await cloudinary.uploader.upload(
    request.files.archivo.tempFilePath
  );

  modelo.img = secure_url;
  await modelo.save();

  return modelo;
};

module.exports = {
  fileUploadLogic,
  actualizarImagenLogic,
  mostrarImagenLogic,
  actualizarImagenLogicCloudinary,
};

const {
  fileUploadLogic,
  actualizarImagenLogic,
  mostrarImagenLogic,
  actualizarImagenLogicCloudinary,
} = require("../services/uploads");

const fileUpload = async (request, response) => {
  try {
    const fileUploads = await fileUploadLogic(request, response);

    if (fileUploads) {
      response.status(200).json({ message: "success", file: fileUploads });
    }
  } catch (error) {
    response.status(500).json({ msg: "Error al subir archivo" });
    throw new Error(error);
  }
};

const actualizarImagen = async (request, response) => {
  try {
    const file = await actualizarImagenLogicCloudinary(request, response);

    if (file) {
      response.status(200).json({ message: "success", file });
    }
  } catch (error) {
    response.status(500).json({ msg: "Error al actualizar imagen" });
    throw new Error(error);
  }
};

const mostrarImagen = async (request, response) => {
  try {
    const file = await mostrarImagenLogic(request, response);

    if (file) {
      response.status(200).sendFile(file);
    }
  } catch (error) {
    response.status(500).json({ msg: "Error al mostrar imagen" });
    throw new Error(error);
  }
};

module.exports = { fileUpload, actualizarImagen, mostrarImagen };

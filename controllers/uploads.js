const { fileUploadLogic } = require("../services/uploads");

const fileUpload = async (req, res) => {
  try {
    const fileUploads = await fileUploadLogic(req, res);

    if (fileUploads) {
      res.status(200).json({ message: "success", file: fileUploads });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error al subir archivo" });
    throw new Error(error);
  }
};

module.exports = { fileUpload };

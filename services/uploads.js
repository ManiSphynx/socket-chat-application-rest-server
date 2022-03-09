const { subirArchivo } = require("../helpers/uploadFiles");

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

module.exports = {
  fileUploadLogic,
};

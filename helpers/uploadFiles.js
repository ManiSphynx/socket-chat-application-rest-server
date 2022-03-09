const path = require("path");
const { v4: uuid } = require("uuid");
const { defaultExtensions } = require("../constants/constantsLibrary");

const subirArchivo = (
  { archivo },
  carpetaDestino = "",
  extensionesValidas = defaultExtensions
) => {
  return new Promise((resolve, reject) => {
    const [_fileName, extension] = archivo.name.split(".");

    if (!extensionesValidas.includes(extension)) {
      return reject(`Extension no valida: ${extension}`);
    }

    const nombreTemp = `${uuid()}.${extension}`;
    const uploadPath = path.join(
      __dirname,
      "../uploads/",
      carpetaDestino,
      nombreTemp
    );

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};

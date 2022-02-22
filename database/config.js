const { connect } = require("mongoose");

const dbConnection = async () => {
  try {
    await connect(process.env.MONGO_CNN);
  } catch (error) {
    throw new Error("Error en la conexion con la base de datos", error);
  }
};

module.exports = {
  dbConnection,
};

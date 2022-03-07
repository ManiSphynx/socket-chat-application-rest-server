const { Schema, model } = require("mongoose");

const categorySchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

categorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  return category;
};

module.exports = model("Categoria", categorySchema);

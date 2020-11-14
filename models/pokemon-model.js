const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema(
  {
    id: Number,
    img: String,
    name: String
  },
  {
    timestamps: true,
  }
);

const Pokemon = mongoose.model("Pokemon", pokemonSchema);
module.exports = Pokemon;

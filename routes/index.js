const express = require('express');
const router  = express.Router();
const {
  addPokemon,
  getPokemons
} = require("../controllers/index-controller");

/* GET home page */
router
  .get('/', (req, res, next) => {
  res.render('index');
})
  .post("/addPkmn", addPokemon)
  .get("/pokemons", getPokemons)

module.exports = router;

const express = require("express");
const mongoose = require("mongoose");
const Pokemon = require("../models/pokemon-model");

const addPokemon = async (req, res, next) => {
  console.log(req.body)
  try {
    const newPokemon = await Pokemon.create(req.body);
    res.status(200).json(newPokemon);
  } catch (error) {
    res.json(error);
  }
};

const getPokemons = async (req, res, next) => {
  try {
    const pokemons = await Pokemon.find();
    res.status(200).json(pokemons);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  addPokemon,
  getPokemons
};
const express = require("express");
const router = express.Router();
const createError = require("http-errors");
// const User = require("../models/user");
const Movie = require('../models/movie');

// router.get("/", async(req, res, next) => {
//     const { limit } = req.query
//   try {
//     let movies = await Movie.find().limit(Number(limit))
//     console.log('MOVIEEEEESSSSSS', movies)
//     res.status(200).json(movies)
//   } catch (error) {
//     console.log(error)
//   }
// });

router.get("/top-rated", async(req, res, next) => {

  try {
    let movies = await Movie.find()
    console.log('MOVIES TOP RATED', movies)
    res.status(200).json(movies)
  } catch (error) {
    console.log(error)
  }
});



module.exports = router;
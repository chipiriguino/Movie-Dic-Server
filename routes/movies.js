const express = require("express");
const router = express.Router();
const createError = require("http-errors");
// const User = require("../models/user");
const Movie = require('../models/movie');

router.get("/", async(req, res, next) => {
    const { limit } = req.query
  try {
    let movies = await Movie.find()
    res.status(200).json(movies)
  } catch (error) {
    console.log(error)
  }
});

router.get("/random", async(req, res, next) => {
  try {
    let moviesrandom = await Movie.find()
    let moviesran =Math.floor(Math.random()*moviesrandom.length)
    res.status(200).json(moviesrandom[moviesran])
  } catch (error) {
    console.log(error)
  }
});

router.get("/popular", async(req, res, next) => {
try {
  let movies = await Movie.find({imdb_score:{$gte: "8"}})
  res.status(200).json(movies)
} catch (error) {
  console.log(error)
}
});

router.get("/movies", async(req, res, next) => {
  try {
    let movies = await Movie.find()
    res.status(200).json(movies)
  } catch (error) {
    console.log(error)
  }
  });

router.get("/top-rated", async(req, res, next) => {
  try {
    let movies = await Movie.find()
    res.status(200).json(movies)
  } catch (error) {
    console.log(error)
  }
  });

  router.get("/details/:id", async(req, res, next) => {
    try {
      let movies = await Movie.findById(req.params.id)
      res.status(200).json(movies)
    } catch (error) {
      console.log(error)
    }
    });

    router.post('/create', (req, res, next) => {
      // console.log('body: ', req.body); ==> here we can see that all
      // the fields have the same names as the ones in the model so we can simply pass
      // req.body to the .create() method
      
      Movie.create(req.body)
      .then( aNewMovie => {
          // console.log('Created new movie: ', aNewMovie);
          res.status(200).json(aNewMovie);
      })
      .catch( err => next(err) )
  })


router


module.exports = router;
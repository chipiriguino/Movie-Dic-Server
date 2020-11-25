const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Movie = require('../models/movie');

// FIND MOVIES ROUTE ON DATABASE

  router.get("/", async(req, res, next) => {
      const { limit } = req.query
    try {
      let movies = await Movie.find()
      res.status(200).json(movies)
    } catch (error) {
      console.log(error)
    }
  });

  // GET RANDOM MOVIE ROUTE

  router.get("/random", async(req, res, next) => {
    try {
      let moviesrandom = await Movie.find()
      let moviesran =Math.floor(Math.random()*moviesrandom.length)
      res.status(200).json(moviesrandom[moviesran])
    } catch (error) {
      console.log(error)
    }
  });

  // MOST-POPULAR ROUTE

  router.get("/popular", async(req, res, next) => {
  try {
    let perpage = 20;
    let movies = await Movie.find({imdb_score:{$gte: "8"}}).limit(perpage).skip(req.query.page*30)
    console.log('MOVIES BACKEND', movies)
    res.status(200).json(movies)
  } catch (error) {
    console.log(error)
  }
  });

  // GET MOVIES ROUTE

  router.get("/allmovies", async(req, res, next) => {
    let perpage = 20;
  try {
    let movies = await Movie.find().limit(perpage).skip(req.query.page*30)
    res.status(200).json(movies)
  } catch (error) {
    console.log(error)
  }
  });

  // router.get("/movies", async(req, res, next) => {
  //   try {
  //     let movies = await Movie.find().limit(50)
  //     res.status(200).json(movies)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   });
    
    
    router.get("/search", async(req, res, next) => {
      try {
        let movies = await Movie.find({movie_title : new RegExp('^' + req.query.find, "i")
      }
        )
        res.status(200).json(movies)
      } catch (error) {
        console.log(error)
      }
      });

  router.get("/carrousel", async(req, res, next) => {
    try {
      let movies = await Movie.find().limit(8)
      res.status(200).json(movies)
    } catch (error) {
      console.log(error)
    }
    });
    
    router.get("/carrousel2", async(req, res, next) => {
      try {
        let movies = await Movie.find({num_voted_users:{$gte: "44000"}}).limit(8)
        res.status(200).json(movies)
      } catch (error) {
        console.log(error)
      }
      });

      router.get("/carrousel3", async(req, res, next) => {
        try {
          let movies = await Movie.find({num_voted_users:{$lte: "20000"}}).limit(8)
          res.status(200).json(movies)
        } catch (error) {
          console.log(error)
        }
        });

  // TOP-RATED ROUTE

  router.get("/top-rated", async(req, res, next) => {
  try {
    let movies = await Movie.find()
    res.status(200).json(movies)
  } catch (error) {
    console.log(error)
  }
  });


  // DETAILS ROUTE

  router.get("/details/:id", async(req, res, next) => {
    try {
      let movies = await Movie.findById(req.params.id)
      res.status(200).json(movies)
    } catch (error) {
      console.log(error)
    }
    });

    //CREATE ROUTES

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
  });

  //UPLOAD ROUTES

  router.get("/upload/:id", async(req, res, next) => {
    try {
      let movies = await Movie.findById(req.params.id)
      res.status(200).json(movies)
    } catch (error) {
      console.log(error)
    }
    });

  router.post("/upload/:id", async(req, res, next) => {
    try {
    const {movie_title, genres, director_name,description, poster, fan_art, content_rating, country, language,  movie_imdb_link, actor_1_name, actor_2_name, actor_3_name, title_year, imdb_score} = req.body.updatedMovie;
    const movieId = req.params.id

    let movies= await Movie.findByIdAndUpdate(movieId, {movie_title, genres, poster, fan_art, description, director_name, content_rating, country, language,  movie_imdb_link, actor_1_name, actor_2_name, actor_3_name, title_year, imdb_score }, {new: true})
    //let movies = await Movie.findByIdAndUpdate(req.params.id)
    console.log(movies)
      res.status(200).json(movies)
    } catch (error) {
      console.log(error)
    }
  });

  //DELETE MOVIE

  router.post('/delete/:id', async (req, res, next) =>{
    try {
      let deleteMovie = await Movie.findByIdAndRemove(req.params.id )
      res.status(200).json("Borrado correctamente")
    } catch (error) {
      console.log('Error eliminando película, prueba en unos minutos', error);
    }
  });

  //FAVOURITE ROUTES

  // router.get("/private", async (req, res, next) =>{
  //   try {
  //     const movieFav = await Movie.findById(favorites)
  //     console.log(movieFav, "this is the MOVIE id")
  //     res.status(200).json()
  //   } catch (error) {
  //     next(error);
  //     return;
  //   }
  // })


  router.get("/private/favorite/:id", async (req, res, next) => {
    const userId = req.params.id;
    console.log(userId);
    try {
      const user = await User.findById(userId).populate('favorites')
      console.log(user)
      console.log(userId, "this is the user id");
      res.status(200).json(user)
    } catch (error) {
      next(error);
      return;
    }
  });
  router.post("/private/favorite", async (req, res, next) => {
    try {
      console.log("entered the route");
      const { userId, movieId } = req.body;
        await User.findByIdAndUpdate(
          userId,
          {   $push: {favorites: movieId} },
          { new: true }
        ).populate('favorites')
        console.log("Saved in the db!");
        res.status(200).json("Añadido a favoritos correctamente!")
    } catch (error) {console.log(error)}
  });

module.exports = router;
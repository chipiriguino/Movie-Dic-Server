const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/user");
const Movie = require('../models/movie');
const FeedNews = require ("../models/FeedNews");
const axios = require("axios");

//UPDATE PROFILE USER

router.get("/private/update/:id", async(req, res, next) => {
  try {
    let userUpdate = await User.findById(req.params.id);
      res.status(200).json(userUpdate)
    } catch (error) {
      console.log(error)
    }
    });

router.post("/private/update/:id", async(req, res, next) => {
  try {
  const {username, mail, image} = req.body;
  console.log( req.params.id, "AQUIIIIIIIIIIIIIIIIIIIIIIIIIII")
  let user= await User.findByIdAndUpdate(req.params.id, {username, mail, image }, {new: true})
  console.log(user, 'USER BACKEND UPDATE')
    res.status(200).json(user)
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

  // GET MOST-POPULAR ROUTE
  router.get("/popular", async(req, res, next) => {
  try {
    let perpage = 20;
    let movies = await Movie.find({imdb_score:{$gte: "8"}}).limit(perpage).skip(req.query.page*20)
    res.status(200).json(movies)
  } catch (error) {
    console.log(error)
  }
  });

  // GET ALLMOVIES ROUTE
  router.get("/allmovies", async(req, res, next) => {
    let perpage = 20;
  try {
    let movies = await Movie.find().limit(perpage).skip(req.query.page*30)
    res.status(200).json(movies)
  } catch (error) {
    console.log(error)
  }
  });

  //GET SEARCH ROUTE
  router.get("/search", async(req, res, next) => {
    try {
      let movies = await Movie.find({movie_title : new RegExp('^' + req.query.find, "i")
    })
    res.status(200).json(movies)
    } catch (error) {
      console.log(error)
    }
  });

  // GET ROUTES FOR CARROUSELS
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
      let movies = await Movie.find({num_voted_users:{$gte: "80000"}}).limit(8)
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

  // --------------> ROUTES MOVIES  <---------------

  // Route GET ONE MOVIE
  router.get("/details/:id", async(req, res, next) => {
    try {
      let movies = await Movie.findById(req.params.id)
      res.status(200).json(movies)
      } catch (error) {
      console.log(error)
      }
  });

  //Create movie
  router.post('/create', (req, res, next) => {   
    Movie.create(req.body)
    .then( aNewMovie => {
      res.status(200).json(aNewMovie);
    })
    .catch( err => next(err) )
  });

  //Upload movie
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
    const movieId = req.params.id;
    let movies= await Movie.findByIdAndUpdate(movieId, {
      movie_title, genres, poster, fan_art, description,
      director_name, content_rating, country, language,
      movie_imdb_link,
      actor_1_name, actor_2_name, actor_3_name,
      title_year, imdb_score
    }, {new: true});
      res.status(200).json(movies)
    } catch (error) {
      console.log(error)
    }
  });

  //ROUTE DELETE MOVIE
  router.post('/delete/:id', async (req, res, next) =>{
    try {
      let deleteMovie = await Movie.findByIdAndRemove(req.params.id )
      res.status(200).json("Borrado correctamente")
    } catch (error) {
      console.log('Error eliminando película, prueba en unos minutos', error);
    }
  });

  // --------> ROUTES FAVOURITES <-------

  //Router GET
  router.get("/private/favorite/:id", async (req, res, next) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId).populate('favorites')
      res.status(200).json(user)
    } catch (error) {
      next(error);
      return;
    }
  });
  
  //Router POST
  router.post("/private/favorite", async (req, res, next) => {
    try {
      const { userId, movieId } = req.body;
        await User.findByIdAndUpdate(
          userId,
          {   $push: {favorites: movieId} },
          { new: true }
        ).populate('favorites')
        res.status(200).json("Añadido a favoritos")
    } catch (error) {console.log(error)}
  });

  //Route DELETE 
  router.post("/private/favorite/delete/:id", async (req, res, next) => {
    try {
      console.log("Ruta delete");
      const { userId, movieId } = req.body;
        await User.findByIdAndDelete(userId, { $push: {favorites: movieId} }).populate('favorites');
        console.log("Eliminado Favorito!");
        res.status(200).json("Eliminado con éxito!")
    } catch (error) {console.log(error)}
  });

  // --------> ROUTES FEED <-------

  // Route to GET all model FeedNews
  router.get("/feed", async (req, res, next) => {
    try {
      const feed = await FeedNews.find().populate('user').populate('movie')
      console.log("FEEEEEEDD", feed, "FEEEDDDD")
      res.status(200).json(feed)
    } catch (error) {
      next(error);
      return;
    }
  });

  //Route to POST to FeedNews model
  router.post("/feed/share", async (req, res, next) => {
    try {
      console.log("entered the route of feed backend");
      const { userId, movieId } = req.body;
        await FeedNews.create(
          userId,
          {movie: movieId, user: userId}
        )
        console.log("Saved in the feed!");
        res.status(200).json("Añadido a feed!!!!")
    } catch (error) {console.log(error)}
  });

  //Route delete from feed
  router.post('/feed/delete/:id', async (req, res, next) =>{
    try {
      let deleteMovie = await FeedNews.findByIdAndRemove(req.params.id )
      res.status(200).json("Borrado correctamente")
    } catch (error) {
      console.log('Error eliminando película, prueba en unos minutos', error);
    }
  });

  // -------->         <-------


module.exports = router;
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

// ADD MOVIE

// router.get("/myprofile/add-movie", withAuth, function (req, res, next) {
//   res.render("/add-event");
// });

// router.post(
//   "/myprofile/add-movie",
//   uploadCloud.single("photo"),
//   withAuth,
//   async (req, res, next) => {
//     const { name, description } = req.body;

//   if (name.length < 5) {
//       res.render("/myprofile/add-movie", {
//         errorMessage: "Your event name should have at least 5 characters",
//       });
//       return;
//     } else if (description.length < 5) {
//       res.render("/myprofile/add-movie", {
//         errorMessage: "Write a longer description!",
//       });
//       return;
//     }
//   try {
//     const addMovie = await Event.findOne({ name: name});
//     if (addMovie !== null) {
//       res.render("/myprofile/add-movie", {
//         errorMessage: "This movie already exists!",
//       });
//       return;
//     }

//     const imgPath = req.file.url;

//     await Event.create({
//       name,
//       description,
//       imgPath,
//     });
//     res.redirect("all-events");
//   } catch (error) {
//     next(error);
//   }
//   User.findOneAndUpdate(
//     { _id: req.session.currentUserInfo._id },
//     { $push: { movies: addMovie.id } },
//     { new: true }
//   ).then((user) => console.log("The movie was created!"));
// }
// );


module.exports = router;
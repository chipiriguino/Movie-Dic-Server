const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thingSchema = new Schema({
    movie_title: { type: String, required: true },
    director_name: { type: String, required: true },
    poster: { type: String, required: true },
    genres: { type: String, required: true },
})

const Movie = mongoose.model('Movie', thingSchema);
module.exports = Movie;

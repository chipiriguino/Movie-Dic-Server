const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thingSchema = new Schema({
    movie_title: { type: String },
    director_name: { type: String },
    poster: { type: String},
    genres: { type: String },
    description: {type: String}
})

const Movie = mongoose.model('Movie', thingSchema);
module.exports = Movie;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thingSchema = new Schema({
    movie_title: { type: String },
    director_name: { type: String },
    poster: { type: String},
    genres: { type: String },
    description: {type: String},
    content_rating: {type: String},
    country: {type: String},
    language: {type: String},
    movie_imdb_link: {type: String},
    actor_1_name: {type: String},
    actor_2_name: {type: String},
    actor_3_name: {type: String},
    title_year: {type: String},
    imdb_score: {type: String},
    fan_art: {type: String},
    },
    {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
})

const Movie = mongoose.model('Movie', thingSchema);
module.exports = Movie;

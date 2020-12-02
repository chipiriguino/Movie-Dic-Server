const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedSchema = new Schema({
  user:  {type: Schema.Types.ObjectId, ref: 'User'},
  movie: {type: Schema.Types.ObjectId, ref: 'Movie'},
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const FeedNews = mongoose.model('FeedNews', feedSchema);

module.exports = FeedNews;
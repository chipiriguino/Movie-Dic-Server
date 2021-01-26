const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  mail: String,
  image: {type: String},
  favorites: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
  likes: [{type: String}],
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
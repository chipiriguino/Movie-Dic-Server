const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  mail: String,
  image: {type: String, default: 'https://www.tuexperto.com/wp-content/uploads/2015/07/perfil_01.jpg'},
  favorites: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const itemSchema = new Schema({
  categoryId: String,
  name: String,
  description: String,
  image: {type:String, default:""}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
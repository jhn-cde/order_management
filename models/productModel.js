const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  id: {type: Number, required: true},
  Status: {type: String, enum: ['Active', 'Inactive']},
  Name: {type: String, trim: true, required: true},
  Category: {type: String, trim: true},
  Price: {type: Number, min: 0, required: true}
})

const ProductModel = mongoose.model('product', ProductSchema)
module.exports = ProductModel

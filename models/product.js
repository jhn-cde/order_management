const mongoose = require('mongoose')
const scheme = mongoose.Schema

const schemeProduct = new scheme({
  id: Number,
  Name: String,
  Category: String,
  Price: Number,
  Status: String,
})

const ModelProduct = mongoose.model('products', schemeProduct)

module.exports = ModelProduct
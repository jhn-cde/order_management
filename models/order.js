const mongoose = require('mongoose')
const scheme = mongoose.Schema

const schemeOrder = new scheme({
  Number: Number,
  Status: String,
  Date: String,
  Consumer: String,
  Subtotal: Number,
  Taxes: {
    CityTax: Number,
    CountyTax: Number,
    StateTax: Number,
    FederalTax: Number
  },
  TotalTaxes: Number,
  Total: Number,
  products: []
})

const ModelOrder = mongoose.model('norders', schemeOrder)

module.exports = ModelOrder
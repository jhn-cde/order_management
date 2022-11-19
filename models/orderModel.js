const mongoose = require('mongoose')
const { DateTime } = require("luxon");

const Schema = mongoose.Schema

const OrderSchema = new Schema({
  Number: {type: Number, required: true},
  Status: {type: String, enum: ['Pending', 'Completed', 'Rejected']},
  Date: {type: Date, default: Date.now() },
  Consumer: {type: String, trim: true, required: true},
  Subtotal: {type: Number, min: 0, required: true},
  Taxes: {
    CityTax: {type: Number, min: 0},
    CountyTax: {type: Number, min: 0},
    StateTax: {type: Number, min: 0},
    FederalTax: {type: Number, min: 0}
  },
  TotalTaxes: {type: Number, min: 0},
  Total: {type: Number, min: 0},
  products: []
})

OrderSchema.virtual('date_formatted').get(function() {
  return DateTime.fromJSDate(this.Date).toLocaleString()
})

const OrderModel = mongoose.model('norders', OrderSchema)
module.exports = OrderModel

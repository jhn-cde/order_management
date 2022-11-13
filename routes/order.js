const express = require('express')

const router = express.Router()

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

const ModelOrder = mongoose.model('orders', schemeOrder)
module.exports = router


router.post('/addorder', (req, res) => {
  let Total = req.body.Subtotal
  const CityTax = Math.round(Total*0.1 * 100) / 100
  Total+=CityTax
  const CountyTax = Math.round(Total*0.05 * 100) / 100
  Total+=CountyTax
  const StateTax = Math.round(Total*0.08 * 100) / 100
  Total+=StateTax
  const FederalTax = Math.round(Total*0.02 * 100) / 100
  Total+=FederalTax
  Total = Math.round(Total*100)/100
  const newOrder = ModelOrder({
    Number: req.body.Number,
    Status: req.body.Status,
    Date: req.body.Date,
    Consumer: req.body.Consumer,
    Subtotal: req.body.Subtotal,
    Taxes: {
      CityTax: CityTax,
      CountyTax: CountyTax,
      StateTax: StateTax,
      FederalTax: FederalTax
    },
    TotalTaxes: CityTax+CountyTax+StateTax+FederalTax,
    Total: Total,
    products: req.body.products
  })
  newOrder.save((err) => {
    if(!err){
      res.send('Order added')
    }else{
      res.send('err')
      console.log(err)
    }
  })
})

router.get('/getorders', (req, res) => {
  console.log('getorders')
  ModelOrder.find({}, (docs, err) => {
    if(!err){
      res.send(docs)
    }else{
      res.send(err)
    }
  })
})

router.post('/getorders', (req, res) => {
  ModelOrder.find({Number:req.body.Number}, (docs, err) => {
    if(!err){
      console.log('success', docs)
      res.send(docs)
    }else{
      console.log('error! getorders ', err)
      res.send(err)
    }
  })
})

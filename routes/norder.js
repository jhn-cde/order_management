const express = require('express')
const ModelOrder = require('../models/order')
const router = express.Router()

module.exports = router

const getTaxes = (Subtotal) => {
  let Total = Subtotal
  let Taxes = {
    CityTax: 0, CountyTax: 0, StateTax: 0, FederalTax: 0
  }
  
  Taxes.CityTax = Math.round(Total*0.1 * 100) / 100
  Total+=Taxes.CityTax
  Taxes.CountyTax = Math.round(Total*0.05 * 100) / 100
  Total+=Taxes.CountyTax
  Taxes.StateTax = Math.round(Total*0.08 * 100) / 100
  Total+=Taxes.StateTax
  Taxes.FederalTax = Math.round(Total*0.02 * 100) / 100
  Total=Math.round((Total+Taxes.FederalTax)*100)/100
  
  let TotalTaxes = (Taxes.CityTax 
    + Taxes.CountyTax 
    + Taxes.StateTax
    + Taxes.FederalTax)
  TotalTaxes = Math.round(TotalTaxes*100)/100
  return {Taxes, TotalTaxes, Total}
}

router.post('/addorder', (req, res) => {
  const Taxes = getTaxes(req.body.Subtotal)
  const newOrder = ModelOrder({
    ...Taxes,
    Number: req.body.Number,
    Status: req.body.Status,
    Date: req.body.Date,
    Consumer: req.body.Consumer,
    Subtotal: req.body.Subtotal,
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
  ModelOrder.find({}, (err, docs) => {
    if(!err){
      res.send(docs)
    }else{
      res.send(err)
    }
  })
})

router.post('/editOrderStatus', (req, res) => {
  ModelOrder.findOneAndUpdate({Number: req.body.Number}, {
    Status: req.body.Status
  }, (err) => {
    if(!err){
      res.send(`Status changed successfully, ${req.body.Status}`)
    }else{
      console.log('error! editOrderStatus ', err)
      res.send(err)
    }
  }).sort({Number:1})
})

router.get('/getordersslice', (req, res) => {
  const query ={
    pag: {
      skip: req.query.page * req.query.rowsPerPage,
      limit: req.query.rowsPerPage
    },
    search: {
      Consumer: {$regex: `.*${req.query.searchtext}.*`, $options: 'i'}
    }
  }
  ModelOrder.find(query.search, {}, query.pag, (docs, err) => {
    if(!err){
      res.send(docs)
    }else{
      res.send(err)
    }
  }).sort({Number:1})
})

router.post('/editOrderProducts', (req, res) => {
  const Subtotal = req.body.products.reduce((ac, product)=> 
    ac + product.Unitprice*product.Quantity, 0)
  const Taxes = getTaxes(Subtotal)
  const toChange = {
    ...Taxes,
    products: req.body.products,
    Subtotal
  }
  ModelOrder.findOneAndUpdate({Number: req.body.Number}, toChange, (err) => {
    if(!err){
      res.send('Products changed successfully')
    }else{
      console.log('error! editOrderProducts ', err)
      res.send(err)
    }
  })
})

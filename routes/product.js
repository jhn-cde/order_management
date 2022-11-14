const express = require('express')

const router = express.Router()

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
module.exports = router


router.post('/addproduct', (req, res) => {
  const newProduct = ModelProduct({
    id: req.body.id,
    Name: req.body.Name,
    Category: req.body.Category,
    Price: req.body.Price,
    Status: req.body.Status
  })
  newProduct.save((err) => {
    if(!err){
      res.send(`Product ${req.body.Name}, id ${req.body.id} added`)
    }else{
      console.log(err)
      res.send('err')
    }
  })
})

router.get('/getproducts', (req, res) => {
  console.log('getproducts')
  ModelProduct.find({}, (docs, err) => {
    if(!err){
      res.send(docs)
    }else{
      res.send(err)
    }
  })
})

router.post('/editProduct', (req, res) => {
  
  const toEdit = {
    Name: req.body.Name,
    Category: req.body.Category,
    Price: req.body.Price,
    Status: req.body.Status,
  }
  ModelProduct.findOneAndUpdate({Number: req.body.id}, toEdit, (err) => {
    if(!err){
      res.send('Product edited successfully')
    }else{
      console.log('error! editOrderProducts ', err)
      res.send(err)
    }
  })
})
const express = require('express')
const ModelProduct = require('../models/product')
const router = express.Router()

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
      res.send(`Product ${req.body.Name}, id: ${req.body.id} added`)
    }else{
      console.log(err)
      res.send('err')
    }
  })
})

router.get('/getproducts', (req, res) => {
  ModelProduct.find({}, (docs, err) => {
    if(!err){
      res.send(docs)
    }else{
      res.send(err)
    }
  }).sort({id:1})
})

router.get('/getproductsslice', (req, res) => {
  const query ={
    pag: {
      skip: req.query.page * req.query.rowsPerPage,
      limit: req.query.rowsPerPage
    },
    search: {
      Name: {$regex: `.*${req.query.searchtext}.*`, $options: 'i'}
    }
  }
  
  ModelProduct.find(query.search, {}, query.pag, (err, docs) => {
    if(!err){
      res.send(docs)
    }else{
      console.log(err)
      res.send([])
    }
  }).sort({id:1})
})

router.post('/editProduct', (req, res) => {
  
  const toEdit = {
    Name: req.body.Name,
    Category: req.body.Category,
    Price: req.body.Price,
    Status: req.body.Status,
  }
  ModelProduct.findOneAndUpdate({id: req.body.id}, toEdit, (err) => {
    if(!err){
      res.send('Product edited successfully')
    }else{
      console.log('error! editOrderProducts ', err)
      res.send(err)
    }
  })
})

router.post('/deleteproduct', (req, res) => {
  ModelProduct.findOneAndDelete({id:req.body.id}, (err) => {
    if(!err){
      res.send(`Product id: ${req.body.id} deleted`)
    }else{
      console.log('error! deleteproduct ', err)
      res.send(err)
    }
  })
})
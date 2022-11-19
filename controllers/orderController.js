const order = require('../models/orderModel')
const OrderModel = require('../models/orderModel');

const getTaxes = require('../utils/taxes')

//list of orders
exports.order_list = (req, res, next) => {
  const searchtext = req.query.search?req.query.search : ''
  const skip = req.query.skip?req.query.skip : 0
  const limit = req.query.skip?req.query.limit : 0
  
  order.find({Consumer: {$regex: `.*${searchtext}.*`, $options: "i"}})
  .sort({Number: 1})
  .skip(skip)
  .limit(limit)
    .exec((err, list_orders) => {
      if(err){
        return next(err)
      }
      
      res.send(list_orders)
  })
}

//order detail
exports.order_detail = (req, res, next) => {
  order.findOne({Number: req.params.id})
    .exec((err, order_detail) => {
      if(err){
        return next(err)
      }
      res.send({...order_detail._doc, Date: order_detail.date_formatted})
    })
}

// Handle order create on post
exports.order_create_post = (req, res, next) => {
  //data is valid
  const taxes = getTaxes(req.body.products)
  const order = new OrderModel({
    ...taxes,
    Number: req.body.Number,
    Date: req.body.Date,
    Consumer: req.body.Consumer,
    Status: req.body.Status,
    products: req.body.products
  })
  order.save((err) => {
    if(err) {
      return next(err)
    }
    //successful
    res.send(`Order number ${order.Number} created successfully`)
  })
}

// Handle order update on POST.
exports.order_update_post = (req, res) => {
  let toUpdate = {...req.body}
  if(req.body.products){
    const taxes = getTaxes(req.body.products)
    toUpdate = {
      ...toUpdate,
      ...taxes
    }
  }

  OrderModel.findOneAndUpdate({Number: req.params.id}, toUpdate, (err, order) => {
    if(!err){
      res.send(`Order number ${req.params.id} updated successfully`)
    }else{
      console.log('error! editOrderStatus ', err)
      res.send(err)
    }
  })
};
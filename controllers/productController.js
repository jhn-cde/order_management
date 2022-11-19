const ProductModel = require('../models/productModel')
const product = require('../models/productModel')

//count documents
exports.product_count = (req, res, next) => {
  const query = ProductModel.countDocuments()
  query.exec((err, count)=>{
    if(err){
      return next(err)
    }
    res.send({count})
  })
}

//list of products
exports.product_list = (req, res, next) => {
  
  const searchtext = req.query.search?req.query.search : ''
  const skip = req.query.skip?req.query.skip : 0
  const limit = req.query.skip?req.query.limit : 0
  product.find({"Name": {"$regex": searchtext, "$options": "i"}})
    .sort({id: 1})
    .skip(skip)
    .limit(limit)
    .exec((err, list_products) => {
      if(err){
        return next(err)
      }
      res.send(list_products)
  })
}

//product detail
exports.product_detail = (req, res) => {
  product.findOne({id: req.params.id})
    .exec((err, product_detail) => {
      if(err){
        return next(err)
      }
      res.send(product_detail)
    })
}

// Handle product create on post
exports.product_create_post = (req, res, next) => {
  const query = ProductModel.countDocuments()
  query.exec((err, count)=>{
    if(err) {
      return next(err)
    }
    const newProduct = new ProductModel({
      ...req.body,
      id: count+1
    })
    newProduct.save((err) => {
      if(err) {
        return next(err)
      }
      //successful
      res.send(`Product created successfully with id ${newProduct.id}`)
    })
  })
}

// Handle product update on POST.
exports.product_update_post = (req, res) => {
  let toUpdate = {...req.body}
  ProductModel.findOneAndUpdate({id: req.params.id}, toUpdate, (err, product) => {
    if(!err){
      res.send({
        order: {...product._doc, ...toUpdate},
        ans: `Product with id ${req.params.id} updated successfully`
      })
    }else{
      console.log('error! update product ', err)
      res.send(err)
    }
  })
};

// Handle product delete on POST.
exports.product_delete_post = (req, res, next) => {
  product.findOneAndDelete({id: req.params.id})
    .exec((err) => {
      if(err){
        return next(err)
      }
      res.send(`Product with id ${req.params.id} deleted`)
    })
};
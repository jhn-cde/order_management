const express = require('express')
const productsRoute = express.Router()
const product_controller = require('../controllers/productController')

productsRoute.get('/products', product_controller.product_list)

productsRoute.get('/products/count', product_controller.product_count)

productsRoute.post('/product/create', product_controller.product_create_post)

productsRoute.get('/product/:id', product_controller.product_detail)

productsRoute.post('/product/:id/delete', product_controller.product_delete_post)

productsRoute.post('/product/:id/update', product_controller.product_update_post)

module.exports = productsRoute
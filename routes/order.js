const express = require('express')
const ordersRoute = express.Router()
const order_controller = require('../controllers/orderController')

ordersRoute.get('/orders', order_controller.order_list)

ordersRoute.post('/order/create', order_controller.order_create_post)

ordersRoute.get('/order/:id', order_controller.order_detail)

ordersRoute.post('/order/:id/update', order_controller.order_update_post)

module.exports = ordersRoute
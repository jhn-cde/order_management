const express = require('express')
const app = express()
const cors = require('cors')

const whiteList = ['https://jhn-cde.github.io/order_management/']

app.use(cors({origin: whiteList})) //allow everywhere

// importar conexion mongoDB
const archivoBD = require('./connection')

// importar el archivo de rutas
const routeProduct = require('./routes/product')
const routeNorder = require('./routes/norder')

//body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))

app.use('/api/product', routeProduct)
app.use('/api/norder', routeNorder)

app.get('/', (req, res) => {
  res.end('Hello world')
})

app.listen(5000, () => { 
  console.log('server running in port (5000) http://localhost:5000')
})

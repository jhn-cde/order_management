const express = require('express')
const app = express()
const port = 5000

const cors = require('cors')
const whiteList = ['https://jhn-cde.github.io', 'http://localhost:3000']
// allow everywhere
app.use(cors({origin: whiteList}))

// import connection mongoDB atlas
const BD = require('./db/connection')

//body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))

//routes
const product = require('./routes/product')
app.use('/api', product)

const order = require('./routes/order')
app.use('/api', order)

//home
app.get('/', (req, res) => {
  res.send('Order management home page')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

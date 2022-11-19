//mongoose module
const mongoose = require('mongoose')

//mongoose connection
require('dotenv').config()
mongoose.connect(process.env.ATLAS_URI)

//use mongoose
const db = mongoose.connection

//connect
db.on('connected', () => {
  console.log('Successfully connected to MongoDB')
})

db.on('error', () => {
  console.log('Error!')
})

module.exports = mongoose
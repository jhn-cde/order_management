const mongoose = require('mongoose')
require('dotenv').config()

const ATLAS_URI = process.env.ATLAS_URI

const connectionString = ATLAS_URI
mongoose.connect(connectionString)


const objetobd = mongoose.connection

objetobd.on('connected', () => {
  console.log('correct connection')
})


objetobd.on('error', () => {
  console.log('Error!')
})

module.exports = mongoose
const mongoose = require('mongoose')
const ATLAS_URI = require('./config');

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
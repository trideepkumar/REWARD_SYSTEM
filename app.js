require('dotenv').config()
const express = require('express')
const qrRouter = require('./routes/qrROuter.js')

const app = express()


app.use('/', qrRouter)

module.exports = app;









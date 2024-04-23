require('dotenv').config()
const express = require('express')
const qrRouter = require('./routes/qrROuter.js')
const morgan = require('morgan')
const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/', qrRouter)

module.exports = app;









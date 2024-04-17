require('dotenv').config()
const express = require('express')
const qrRouter = require('./routes/qrROuter.js')

const app = express()

app.use(express.json())

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use('/', qrRouter)

module.exports = app;









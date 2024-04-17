
require('dotenv').config()
const express = require('express')
const qrRouter = require('./routes/qrROuter.js')
const connection = require('./config/connection.js')
const {dev} = require('./config/db.config.js')

const app = express()
const PORT = process.env.PORT || 4000;

app.use('/',qrRouter)



connection(dev.url)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




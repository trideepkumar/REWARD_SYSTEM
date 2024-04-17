require('dotenv').config()
const express = require('express')
const qrRouter = require('./routes/qrROuter.js')
const connection = require('./config/connection.js')
const { config } = require('./config/db.config.js')

const app = express()
const PORT = process.env.PORT || 4000;

app.use('/', qrRouter)

async function startServer() {
    const uri = process.env.NODE_ENV === "developement" ? config.dev : config.local
    connection(uri).then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
    })
}

startServer();








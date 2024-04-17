const express = require('express')
const qrRouter = require('./routes/qrROuter.js')

const app = express()

app.use('/',qrRouter)






app.listen(4000, () => {
    console.log("Server is running on port 4000 edited");
});




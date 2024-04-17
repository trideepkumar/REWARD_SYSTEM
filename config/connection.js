const mongoose = require('mongoose')

const connection = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("database connected")
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = connection;
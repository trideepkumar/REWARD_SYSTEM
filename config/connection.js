const mongoose = require('mongoose')

const connection = async (url) => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {   
            if (err) {
                console.log(`Error connecting to database, ${err}`);
                return
            }
            console.log(`Connected to database`);
        })
    } catch (error) {
        console.error(error);
    }
}

module.exports = connection;
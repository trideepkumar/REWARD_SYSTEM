require('dotenv').config()
const connection = require('./config/connection.js')
const { config } = require('./config/db.config.js')

const app = require('./app.js')
const PORT = process.env.PORT || 4000;

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

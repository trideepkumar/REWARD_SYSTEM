const { v4: uuidv4 } = require('uuid');

function generateShortUUID() {
    const fullUUID = uuidv4();
    const shortUUID = fullUUID.replace(/-/g, '').substr(0, 10);
    return fullUUID;
}

module.exports = generateShortUUID;

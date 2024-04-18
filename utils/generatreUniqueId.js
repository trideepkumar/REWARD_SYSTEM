const { v4: uuidv4 } = require('uuid');

function generateShortUUID() {
    // Generate a full UUID
    const fullUUID = uuidv4();
    // Split the UUID into groups of 4 characters each
    const groups = fullUUID.split('-');
    // Concatenate the groups and separate them with "-"
    const shortUUID = groups.join('').match(/.{1,4}/g).join('-').slice(0, 19);
    return shortUUID;
}

module.exports = generateShortUUID;

const express = require('express');
const { generateQr } = require('../controllers/qrController.js');

const router = express.Router();

router.post('/generateQr',generateQr)


module.exports = router;

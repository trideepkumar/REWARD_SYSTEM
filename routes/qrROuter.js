const express = require('express');
const { generateQr,qrScanning } = require('../controllers/qrController.js');

const router = express.Router();

router.post('/generateQr',generateQr)
router.post('/qrscanning',qrScanning)


module.exports = router;

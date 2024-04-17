const express = require('express');
const { generateQr,qrScanning,getAllQrcodes } = require('../controllers/qrController.js');

const router = express.Router();

router.post('/generateQr',generateQr)
router.post('/qrscanning',qrScanning)
router.get('/fetchqrs',getAllQrcodes);

module.exports = router;

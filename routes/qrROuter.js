const express = require('express');
const { generateQr,qrScanning,getAllQrcodes,showQr,downloadPdf } = require('../controllers/qrController.js');

const router = express.Router();

router.post('/generateQr',generateQr)
router.post('/qrscanning',qrScanning)
router.get('/fetchqrs',getAllQrcodes);
router.get('/showqr',showQr);
router.get('/download-pdf',downloadPdf);

module.exports = router;

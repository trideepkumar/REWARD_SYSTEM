const express = require('express');
const { generateQr,qrScanning,getAllQrcodes,showQr,downloadPdf, downloadWithPuppeteer,verifyQR,getReports,updateManager } = require('../controllers/qrController.js');

const router = express.Router();

router.post('/generateQr',generateQr)
router.post('/qrscanning',qrScanning)


router.get('/fetchqrs',getAllQrcodes);
router.get('/showqr',showQr);
router.get('/download-pdf',downloadPdf);
router.get('/downloadPdfWithPuppeteer',downloadWithPuppeteer)
router.get('/verifyQR',verifyQR)

router.get('/getreports',getReports)
router.patch('/updatemanager/:id',updateManager);

module.exports = router;

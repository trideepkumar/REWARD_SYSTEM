const QRCode = require('../models/QrModel.js');
const generateQRCode = require('../utils/generateQRCode.js')
const generateShortUUID = require('../utils/generatreUniqueId.js')
const {baseUrl} = require('../config/constants.js')
const generatePDF = require('../utils/generatePdf.js')
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const puppeteer = require('puppeteer');



const generateQr = async (req, res) => {
    try {
        const { managerId, managerName, cardType } = req.body;


        if (!managerId || !managerName || !cardType) {
            return res.status(400).send('Missing required fields: managerId, managerName, cardType');
        }

        const uniqueId = generateShortUUID()

        console.log(uniqueId)

        const data = `${baseUrl}/?uniqueId=${uniqueId}&managerName=${managerName}&managerId=${managerId}`;
        const qrPath = await generateQRCode(data)
        console.log("data",data)


        // const qrCodeImage = await qrcode.toDataURL(data);

        const qrCode = new QRCode({
            uniqueId:uniqueId,
            data: data,
            type: cardType,
            qrCodeImage: qrPath
        });

        await qrCode.save();

        console.log('QR Code saved successfully.');

        res.status(200).json(qrCode);
    } catch (err) {
        console.error(err);
        res.status(500).send('Something went wrong!');
    }
};

const getAllQrcodes = async (req,res) => {
    try {
        const qrData = await QRCode.find({isUsed:false});
        res.status(200).json(qrData)
    } catch (error) {
        console.error(err);
        res.status(500).send('Something went wrong!');
    }
}

const qrScanning = async (req, res) => {
    try {
        const { managerName, type, status, uniqueId } = req.params;
        const { employee } = req.body;

        console.log(managerName, type, status, employee, uniqueId);

        const qrCard = await QRCode.findOneAndUpdate(
            { uniqueId: uniqueId },
            { $set: { employee: employee, isUsed: true, status: 'awardedToEmployee' }}
        );

        console.log(qrCard);

        res.status(200).json(qrCard);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
};

const showQr = async (req,res) => {
    try {
        res.render('viewQr')
    } catch (error) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
}

const downloadPdf = async (req,res) => {
    try {
        // Get coupons data (assuming it's an array of objects)
        const couponsData = await QRCode.find({isUsed:false});

        // Generate PDF content for all coupons
        const pdfContent = await generatePDF(couponsData);

        // Send the PDF file as a response with appropriate headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="coupons.pdf"');
        res.send(pdfContent);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports = {generateQr,qrScanning,getAllQrcodes,showQr,downloadPdf};

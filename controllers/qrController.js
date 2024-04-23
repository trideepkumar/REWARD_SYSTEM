const QRCode = require('../models/QrModel.js');
const generateQRCode = require('../utils/generateQRCode.js')
const generateShortUUID = require('../utils/generatreUniqueId.js')
const {baseUrl} = require('../config/constants.js')
const generatePDF = require('../utils/generatePdf.js')
const puppeteer = require('puppeteer');



const generateQr = async (req, res) => {
    try {
        const { managerId, managerName, cardType } = req.body;


        if (!managerId || !managerName || !cardType) {
            return res.status(400).send('Missing required fields: managerId, managerName, cardType');
        }

        const uniqueId = generateShortUUID()

        console.log(uniqueId)

        const data = `{uniqueKey:${uniqueId},cardType:${cardType}}`;

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

        if(!managerName, !type, !status, !uniqueId ,!employee){
            res.status(401).json('Provide correct Details!!')
        }

        const qrCard = await QRCode.findOneAndUpdate(
            { uniqueId: uniqueId },
            { $set: { employee: employee, isUsed: true, status: 'awardedToEmployee' }}
        );

        if(!qrCard){
            res.status(401).json('QR code not Found!')
        }

        console.log(qrCard);

        res.status(200).json(qrCard);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong!");
    }
};

const showQr = async (req,res) => {
    try {
        const qrData = await QRCode.find({isUsed:false});
        function getColor(type) {
            switch(type) {
                case 'gold':
                    return '#FFD700';
                case 'silver':
                    return '#C0C0C0';
                default:
                    return '#FFD700'; 
            }
        }
        res.render('viewQr', {qrData,getColor})
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

const downloadWithPuppeteer = async (req,res)=>{
    try{
        const browser = await puppeteer.launch();
        // Create a new page
        const page = await browser.newPage();
        // this is the page where puppeteer take scrnshot 
        // const website_url = '/admin/generateTable';
        // const currentUrl = page.url(); // get the current URL
        // const baseUrl = currentUrl.substring(0, currentUrl.indexOf('/', 8)); // get the base URL
        // const website_url = `${baseUrl}/admin/generateTable`; // construct the full URL
        const website_url = `${req.protocol}://${req.get("host")}/showqr`;
   
        console.log(website_url);

        await page.goto(website_url, { waitUntil: 'networkidle0' });

        //To reflect CSS used for screens instead of print
        await page.emulateMediaType('screen');

        const pdf = await page.pdf({
            path: 'result.pdf',
            // margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
            printBackground: true,
            format: 'A4',
        });
        res.download('result.pdf');


        await browser.close();

    }catch(err){
        console.log(err)
    }
}


const verifyQR = async (req, res, next) => {
    try {
        const { uniqueId } = req.params
        if (!uniqueId) {
            return res.status(401).json('Invalid QR code found')
        }

        const qrCode = await QRCode.findOne({ uniqueId, isUsed: false })

        if (qrCode) {
            req.qrCode = qrCode
            return next()
        } else {
            return res.status(401).json('QR code is already used!')
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json('Internal Server Error')
    }
};




module.exports = {generateQr,qrScanning,getAllQrcodes,showQr,downloadPdf,downloadWithPuppeteer,verifyQR};

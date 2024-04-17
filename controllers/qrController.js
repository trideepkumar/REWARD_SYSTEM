const QRCode = require('../models/QrModel.js');
const qrcode = require('qrcode');
const uuid = require('uuid');
const generateQRCode = require('../utils/generateQRCode.js')

const generateQr = async (req, res) => {
    try {
        
        const { managerId, managerName, cardType } = req.body;
        if (!managerId || !managerName || !cardType) {
            return res.status(400).send('Missing required fields: managerId, managerName, cardType');
        }

        const data = `${uuid.v4()}/${managerName}/${managerId}`;
        const qrPath = await generateQRCode(data)
        console.log("path",qrPath)


        // const qrCodeImage = await qrcode.toDataURL(data);

        const qrCode = new QRCode({
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

module.exports = { generateQr };

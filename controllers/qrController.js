const QRCode = require('../models/QrModel.js');
const qrcode = require('qrcode');
const uuid = require('uuid');
const generateQRCode = require('../utils/generateQRCode.js')
const generateShortUUID = require('../utils/generatreUniqueId.js')
const {baseUrl} = require('../config/constants.js')


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


module.exports = {generateQr,qrScanning,getAllQrcodes};

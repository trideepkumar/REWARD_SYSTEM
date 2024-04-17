const qr = require('qrcode');
const fs = require('fs');

// Function to generate QR code
async function generateQRCode(text) {
    try {
        // Generate QR code
        const qrData = await qr.toDataURL(text);

        // Convert base64 data to buffer
        const qrBuffer = Buffer.from(qrData.split(',')[1], 'base64');
        const fileName =`${Date.now()}.png`;
        // Save buffer to file
        fs.writeFileSync(`public/${fileName}.png`, qrBuffer);

        console.log('QR code saved successfully!');
        return fileName;
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
}


// generateQRCode(qrText, fileName);

module.exports = generateQRCode;

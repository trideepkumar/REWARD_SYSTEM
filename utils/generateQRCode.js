const qr = require('qrcode');
const fs = require('fs');

// Function to generate QR code
async function generateQRCode(text, fileName) {
    try {
        // Generate QR code
        const qrData = await qr.toDataURL(text);

        // Convert base64 data to buffer
        const qrBuffer = Buffer.from(qrData.split(',')[1], 'base64');

        // Save buffer to file
        fs.writeFileSync(`public/${fileName}.png`, qrBuffer);

        console.log('QR code saved successfully!');
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
}

// Example usage
const qrText = 'Hello, World!'; // Text you want to encode into QR code
const fileName = 'qr_code'; // File name (without extension)

// generateQRCode(qrText, fileName);

module.exports = generateQRCode;

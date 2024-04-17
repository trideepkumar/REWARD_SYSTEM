const mongoose = require('mongoose');


const qrCodeSchema = new mongoose.Schema({
    data: { type: String, required: true },
    uniqueId:{type:String, required:true},
    isUsed:{type:Boolean,default:false},
    type: { type: String, required: true,enum: ['gold', 'silver'] },
    qrCodeImage: { type: String, required: true },
    status:{type:String,default:'generated',enum: ['generated', 'handedToManager', 'awardedToEmployee']}
})

const QRCode = mongoose.model('QRCode', qrCodeSchema);

module.exports = QRCode;
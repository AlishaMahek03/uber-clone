const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    captainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain'
    },
    pickup: {
        type: String,
        required: true
    },
    dropoff: {
        type: String,
        required: true
    },
    distance: {
        type: Number
    },
    time: {
        type: Number
    },
    fare: {
        type: Number,
        required: true
    },
    paymentid: {
        type:String,
    },
    orderId: {
        type: String,
    },
    vehicleType: {
        type: String,
        enum: ['car', 'motorcycle', 'auto'],
        required: true
    },
    signature: {
        type: String,
    },
    otp:{
        type: String,
        select: false,
        required: true
    },
    status: {
        type: String,
        enum: ['pending','accepted','ongoing', 'completed', 'cancelled'],
        default: 'pending'
    }
});

module.exports = mongoose.model('ride', rideSchema);
const { error } = require('console');
const rideModel = require('../models/ride.model');
const captainmodel = require('../models/captain.model')
const mapsService = require('./maps.service');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket');

async function getfare(pickup, dropoff) {
    if (!pickup || !dropoff) {
        throw new Error('Pickup and destination are required');
    }

    const distancetime = await mapsService.getDistanceAndTime(pickup, dropoff);
    if (!distancetime) {
        throw new Error('Distance and time not found');
    }

   
    // Parse distance (e.g., '1,586 km' -> 1586)
    const distance = parseFloat(distancetime.distance.replace(/,/g, '').split(' ')[0]);
    // Parse duration (e.g., '18 hours 18 mins' -> 1098 minutes)
    const durationParts = distancetime.duration.split(' ');
    let duration = 0;
    for (let i = 0; i < durationParts.length; i += 2) {
        const value = parseInt(durationParts[i]);
        if (durationParts[i + 1].includes('hour')) {
            duration += value * 60; // Convert hours to minutes
        } else if (durationParts[i + 1].includes('min')) {
            duration += value; // Add minutes
        }
    }

    
    if (isNaN(distance) || isNaN(duration)) {
        throw new Error('Invalid distance or duration data');
    }

    const baseFares = {
        car: 2.50,      // Standard taxi base fare
        auto: 1.50,     // Slightly lower than car
        motorcycle: 1.20 // Lowest base fare
    };

    const ratePerKm = {
        car: 4.0,      // Standard Canadian taxi rate
        auto: 3.0,     // Slightly lower than car
        motorcycle: 2.0 // Lowest rate
    };

    const ratePerMinute = {
        car: 0.20,      // Time-based rate for car
        auto: 0.10,     // Slightly lower than car
        motorcycle: 0.10 // Lowest time-based rate
    };

    const fares = {};
    for (const vehicleType of ['car', 'motorcycle', 'auto']) {
        fares[vehicleType] = Math.round(
                (baseFares[vehicleType] + 
                (distance * ratePerKm[vehicleType]) + 
                (duration * ratePerMinute[vehicleType])) * 100
            ) / 100;
    }
   
    return fares;
}

module.exports.getFare = getfare;

function getOTP(number) {
    const otp = crypto.randomInt(10 ** (number - 1), 10 ** number - 1);
    return otp;
}

module.exports.createRide = async (userId, pickup, dropoff, vehicleType) => {
    if (!userId || !pickup || !dropoff || !vehicleType) {
        throw new Error('User ID, pickup, dropoff, and vehicle type are required');
    }

    const fares = await getfare(pickup, dropoff);
    const fare = fares[vehicleType];
    if (!fare) {
        throw new Error('Invalid fare amount');
    }

    const otp = getOTP(4); // Generate a 4-digit OTP

    const ride = new rideModel({
        userId,
        pickup,
        dropoff,
        otp, // Save the generated OTP in the ride object
        fare: fare, // Use the amount from the fare object
        vehicleType
    });


    return await ride.save();
};


module.exports.confirmride = async({rideId, captain})=>{

    if(!rideId){
        throw new Error('Ride Id is required!')
    }
    if(!captain || !captain._id){
        throw new Error('Captain is required!')
    }
    // ...


    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captainId: captain._id
    })

     const ride = await rideModel.findOne({
        _id: rideId
    }).populate('userId').populate('captainId').select('+otp');

    if(!ride){
        throw new error('Ride Not Found!')
    }


    return ride;
}

module.exports.startRide = async({rideId, otp, captain})=>{
    if(!otp || !rideId){
        throw new Error("Ride Id and OTP are required!");
    }
    const ride = await rideModel.findOne({
        _id:rideId
    }).populate('userId').populate('captainId').select('+otp');


    if(!ride){
        throw new Error("Ride not found!");
    }

    if(ride.status !== 'accepted'){
        throw new Error('Ride not accepted!');
    }
    if(ride.otp !== otp){
         throw new Error('INVALID OTP!');
    }

    await rideModel.findOneAndUpdate({
        _id:rideId
    }, {
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.userId.socketId, {
        event:'ride-started',
        data: ride
    })

    return ride;
}
module.exports.endride = async({rideId, captain})=>{
    if(!rideId){
        throw new Error("Ride Id is required!");
    }
    const ride = await rideModel.findOne({
        _id:rideId,
        captainId:captain._id
    }).populate('userId').populate('captainId');


    if(!ride){
        throw new Error("Ride not found!");
    }


    await rideModel.findOneAndUpdate({
        _id:rideId
    }, {
        status: 'completed'
    })

    // Emit event to user
    sendMessageToSocketId(ride.userId.socketId, {
        event: 'ride-ended'
    });

    return ride;
}

const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto');

async function getfare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distancetime = await mapsService.getDistanceAndTime(pickup, destination);
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
        fares[vehicleType] = {
            amount: Math.round(
                (baseFares[vehicleType] + 
                (distance * ratePerKm[vehicleType]) + 
                (duration * ratePerMinute[vehicleType])) * 100
            ) / 100, // Round to two decimal places
            currency: 'CAD'
        };
    }
   
    return fares;
}

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
        fare: fare.amount, // Use the amount from the fare object
        vehicleType,
        currency: fare.currency // Save the currency in the ride model
    });


    return await ride.save();
};
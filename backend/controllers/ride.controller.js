const rideservice = require('../services/ride.service');
const { validationResult } = require('express-validator');

const mapsservice = require("../services/maps.service");
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const  userId  = req.user._id.toString();
    if (!userId) {
        return res.status(401).json({ error: 'User Id Not found!' });
    }
    const {pickup, dropoff, vehicleType } = req.body;
    try {
        const ride = await rideservice.createRide(userId, pickup, dropoff, vehicleType);
        res.status(201).json(ride);

        const pickupCoordinates = await mapsservice.getAddresscoordinates(pickup);
        console.log(pickupCoordinates);

        const captaininRadius = await mapsservice.getCaptainRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 2);
        ride.otp=" ";

        const rideWithUser = await rideModel.findOne({_id: ride._id}).populate('userId');
        captaininRadius.map(Captain=>{
            sendMessageToSocketId(Captain.socketId, {
                event:"new-ride",
                data: rideWithUser
            })
        })
            
    } catch (error) {
        console.error('Error creating ride:', error);
        res.status(500).json({ error: 'Failed to create ride' });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { pickup, dropoff } = req.query;
    try {
        const fare = await rideservice.getFare(pickup, dropoff);
        res.status(200).json(fare);
    } catch (error) {
        console.error('Error getting fare:', error);
        res.status(500).json({ error: 'Failed to get fare' });
    }
};


module.exports.confirmride = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json(({errors: errors.array()}))
    }


    const {rideId} = req.body;

    try{
        const ride = await rideservice.confirmride({rideId, captain: req.captain});

        sendMessageToSocketId(ride.userId.socketId, {
            event:"ride-confirmed",
            data:ride
        })

        return res.status(200).json(ride);

    } catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

module.exports.startRide = async(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json(({errors: errors.array()}))
    }

    const {rideId, otp} = req.query;


     try{
        const ride = await rideservice.startRide({rideId,otp, captain: req.captain});

        sendMessageToSocketId(ride.userId.socketId, {
            event:"ride-started",
            data:ride
        })

        return res.status(200).json(ride);

    } catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }

}

module.exports.endride = async(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json(({errors: errors.array()}))
    }

    const {rideId} = req.body;


     try{
        const ride = await rideservice.endride({rideId, captain: req.captain});

        sendMessageToSocketId(ride.userId.socketId, {
            event:"ride-ended",
            data:ride
        })

        return res.status(200).json(ride);

    } catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }

}
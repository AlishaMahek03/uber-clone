const rideservice = require('../services/ride.service');
const { validationResult } = require('express-validator');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const  userId  = req.user._id.toString();
    console.log(userId);
    if (!userId) {
        return res.status(401).json({ error: 'User Id Not found!' });
    }
    const {pickup, dropoff, vehicleType } = req.body;
    try {
        const ride = await rideservice.createRide(userId, pickup, dropoff, vehicleType);
        res.status(201).json(ride);
    } catch (error) {
        console.error('Error creating ride:', error);
        res.status(500).json({ error: 'Failed to create ride' });
    }
};
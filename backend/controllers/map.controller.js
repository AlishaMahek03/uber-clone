const mapsService = require('../services/maps.service');
const {validationResult} = require('express-validator');
const captainModel = require('../models/captain.model');

module.exports.getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {address} = req.query;
    try {
        const coordinates = await mapsService.getAddresscoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(404).json({ error: 'Coordinate not found' });
    }
}

module.exports.getDistanceAndTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {origin, destination} = req.query;
    try {
        const distanceAndTime = await mapsService.getDistanceAndTime(origin, destination);
        res.status(200).json(distanceAndTime);
    } catch (error) {
        console.error('Error fetching distance and time:', error);
        res.status(404).json({ error: 'Distance and time not found' });
    }
}

module.exports.suggestionLocationPanel = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {input} = req.query;
    console.log("Input received:", input);
    try {
        const suggestions = await mapsService.suggestionLocationPanel(input);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(404).json({ error: 'Suggestions not found' });
    }
}



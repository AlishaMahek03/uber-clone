const mapsService = require('../services/maps.service');


module.exports.getCoordinates = async (req, res) => {
    const {address} = req.query;
    try {
        const coordinates = await mapsService.getCoordinates();
        res.status(200).json(coordinates);
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(404).json({ error: 'Coordinate not found' });
    }
}
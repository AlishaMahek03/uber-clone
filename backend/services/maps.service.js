const axios = require('axios');

module.exports.getAddresscoordinates = async (address) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: process.env.GOOGLE_MAPS_API_KEY // Make sure to set this in your environment variables
            }
        });

        if (response.data.status === 'OK' && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('No results found for the given address');
        }
    } catch (error) {
        throw new Error(`Error getting coordinates: ${error.message}`);
    }
};
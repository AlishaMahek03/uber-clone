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

module.exports.getDistanceAndTime = async (origin, destination) => {
    if(!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apikey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apikey) {
        throw new Error('Google Maps API key is not set');
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apikey}`;


    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const element = response.data.rows[0].elements[0];
            if (element.status === 'OK') {
                if(element.distance.value === 0 && element.duration.value === 0) {
                    throw new Error('Distance and duration are both zero, please check the origin and destination');
                }
                return {
                    distance: element.distance.text,
                    duration: element.duration.text
                };
            } else {
                throw new Error('No results found for the given origin and destination');
            }
        } else {
            throw new Error('Error fetching distance and time');
        }
    } catch (error) {
        throw new Error(`Error getting distance and time: ${error.message}`);
    }
}


module.exports.suggestionLocationPanel = async (input) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json', {
            params: {
                input: input,
                key: process.env.GOOGLE_MAPS_API_KEY // Make sure to set this in your environment variables
            }
        });

        if (response.data.status === 'OK' && response.data.predictions.length > 0) {
            return response.data.predictions;
        } else {
            throw new Error('No suggestions found for the given input');
        }
    } catch (error) {
        throw new Error(`Error getting suggestions: ${error.message}`);
    }
};
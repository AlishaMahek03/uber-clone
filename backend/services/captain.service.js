const captainmodel = require('../models/captain.model');


module.exports.createcaptain = async({firstname, lastname, email, password, color, plate, capacity, vehicletypes }) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicletypes) {
        throw new Error("All fields are required");
    }
    const captain = new captainmodel({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicletypes
        }
    });
    return await captain.save();
}
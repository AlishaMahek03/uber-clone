const BlacklistToken = require('../models/blacklistToken.model');
const captainmodel = require('../models/captain.model');
const captainservice = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {fullname, email, password, vehicle} = req.body;

    const iscaptain_exists = await captainmodel.findOne({ email });
    if (iscaptain_exists) {
        return res.status(422).json({ message: 'Captain already exists' });
    }

    const hashpassword = await captainmodel.hashpassword(password);

    const captain = await captainservice.createcaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashpassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicletypes: vehicle.vehicletypes
    });
    await captain.save();
    const token = await captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

module.exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {email, password} = req.body;

    const captain = await captainmodel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    await captain.save();
    const token = await captain.generateAuthToken();
    res.cookie('token', token);
    res.status(201).json({ token, captain });
}

module.exports.getcaptainprofile = async (req, res) => {
    const captain = req.captain;
    if (!captain) {
        return res.status(404).json({ message: 'Captain not found' });
    }
    res.status(200).json({ captain });
}

module.exports.logout = async (req, res) => {
    
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({message: 'Logged out successfully'});
}

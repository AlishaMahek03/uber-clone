const usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const BlacklistToken = require('../models/blacklistToken.model');
const captainmodel = require('../models/captain.model');


module.exports.authuser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isblacklisted = await BlacklistToken.findOne({ token: token });
    if (isblacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded._id);

        req.user = user;
        return next();
    }catch(err){
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports.authcaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isblacklisted = await BlacklistToken.findOne({ token: token });
    if (isblacklisted) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainmodel.findById(decoded._id);

        req.captain = captain;
        return next();
    }catch(err){
        return res.status(401).json({ message: 'Unauthorized' });
    }

}
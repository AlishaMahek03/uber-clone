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
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized: user not found' });
}


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
        console.log(decoded);
        const captain = await captainmodel.findById(decoded._id);
        console.log(captain)
        if (!captain) {
            return res.status(401).json({ message:'Unauthorized: captain not found : ian from auth middle ware brooo' });
        }

        req.captain = captain;
        return next();
    }catch(err){
        return res.status(401).json({ message: 'Unauthorized' });
    }

}
const usermodel = require('../models/user.model');
const usersevice = require('../services/user.service.js');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model');
module.exports.register = async (req, res, next) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const {fullname, email, password} = req.body;

    const hashpassowrd = await usermodel.hashpassword(password);

    const isuserexists = await usermodel.findOne({ email });
    if (isuserexists) {
        return res.status(422).json({ message: 'User already exists' });
    }

    const  user = await usersevice.createuser(
        {firstname: fullname.firstname,
         lastname:fullname.lastname, 
         email, 
         password: hashpassowrd
        }
    );
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).json({ token, user
    });
}

module.exports.login = async (req, res, next) => {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    const user = (await usermodel.find({ email }).select('+password').limit(1))[0];
    
 
    if (!user) {
        console.log("user not found");
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({message: 'Invalid email or password'});
    }
    await user.save();
    const token = await user.generateAuthToken();

    res.cookie('token', token);
    res.status(200).json({ token, user });

}

module.exports.getuserprofile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logout = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({message: 'Logged out successfully'});
}
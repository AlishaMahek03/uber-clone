const express = require('express');
const router = express.Router();
const captainmodel = require('../models/captain.model');
const captaincontroller = require('../controllers/captain.controller');
const { body } = require('express-validator');
const { authcaptain } = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({ min: 3 }).withMessage("Color should be at least 3 characters long!"),
    body('vehicle.plate').isLength({ min: 3 }).withMessage("Plate should be at least three characters long!"),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1!'),
    body('vehicle.vehicletypes').isIn(['car', 'auto', 'bike']).withMessage("Invalid vehicle type")
], captaincontroller.register);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], captaincontroller.login);


router.get('/profile', authcaptain,captaincontroller.getcaptainprofile);

router.get('/logout', authcaptain, captaincontroller.logout);


module.exports = router;
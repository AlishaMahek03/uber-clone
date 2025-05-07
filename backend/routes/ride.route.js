const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const ridecontroller = require('../controllers/ride.controller');

router.post('/create', 
    authMiddleware.authuser,
    body('pickup').isString().withMessage('Pickup location must be a string'),
    body('dropoff').isString().withMessage('Dropoff location must be a string'),
    body('vehicleType')
        .isString()
        .isIn(['auto', 'car', 'motorcycle'])
        .withMessage('Vehicle type must be a string and one of auto, car, motorcycle'),
    
    ridecontroller.createRide
)

module.exports = router;
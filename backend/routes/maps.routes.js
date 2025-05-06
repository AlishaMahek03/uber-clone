const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');

const mapcontroller = require('../controllers/map.controller');
const { query } = require('express-validator');

router.get('/getcoordinates',
    query('address').isString().isLength({ min: 3 }).withMessage('Address must be a string with at least 2 characters'),
    authMiddleware.authuser, mapcontroller.getCoordinates);


router.get('/getdistance-time',
    query('origin').isString().isLength({ min: 3 }).withMessage('Origin must be a string with at least 2 characters'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination must be a string with at least 2 characters'),
    authMiddleware.authuser, mapcontroller.getDistanceAndTime);


router.get('/suggestion_locationpanel', query('input').isString().isLength({ min: 3 }).withMessage('Input must be a string with at least 2 characters'), authMiddleware.authuser, mapcontroller.suggestionLocationPanel);
module.exports = router;
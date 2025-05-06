const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const mapcontroller = require('../controllers/map.controller');
const {query} = require('express-validator');

router.get('/getcoordinates', 
    query('address').isString().minlen(2).withMessage('Address must be a string with at least 2 characters'),
    authMiddleware.authuser)

module.exports = router;
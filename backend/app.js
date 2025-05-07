const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");
connectDB();
const mapsRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.route");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

app.get('/', (req, res)=>{
    res.send("Hello!")
});

module.exports = app;
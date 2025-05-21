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


const allowedOrigins = [
  'http://localhost:5173',
  'https://uber-clone-4u0q.onrender.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

app.get('/', (req, res)=>{
    res.send("Hello!")
});

module.exports = app;
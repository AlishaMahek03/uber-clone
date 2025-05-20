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

const allowedOrigins = [
  'http://localhost:5173',
  'https://uber-clone-91h6.onrender.com', // <-- your deployed frontend
  // add any other frontend URLs you use
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
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

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
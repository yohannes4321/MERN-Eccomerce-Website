const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/routes');
const path = require('path');

const app = express();

// Middleware
const cors = require('cors');

const allowedOrigins = ['https://mern-eccomerce-website-1-etxt.onrender.com']; // Add allowed front-end domains
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow cookies and other credentials
}));
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

// Removed the incorrect argument 'credentials: true'
app.use(express.json()); // For parsing JSON request bodies
app.use(cors({ credentials: true })); // Use CORS with credentials enabled if needed

// Routes
app.use('/api', router);

const PORT = process.env.PORT || 8080;

// Serve static files in production

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Connected to the database');
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database', error);
});

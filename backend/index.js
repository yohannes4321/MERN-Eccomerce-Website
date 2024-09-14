const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/routes');
const path = require('path');

const app = express();

// Middleware
app.use(cookieParser()); // Removed the incorrect argument 'credentials: true'
app.use(express.json()); // For parsing JSON request bodies
app.use(cors({ credentials: true })); // Use CORS with credentials enabled if needed

// Routes
app.use('/api', router);

const PORT = process.env.PORT || 8080;

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'), (err) => {
      if (err) {
        next(err);
      }
    });
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running successfully');
  });
}

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Connected to the database');
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database', error);
});

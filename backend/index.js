const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/routes');
const path = require("path");
const app = express();

// Allowed origins for CORS
const allowedOrigins = ['https://migibee.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, headers, etc.)
}));

app.use(cookieParser());
app.use(express.json()); // For parsing JSON request bodies

// Routes
app.use("/api", router);

const PORT = process.env.PORT || 8080;

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"), (err) => {
      if (err) {
        next(err);
      }
    });
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running successfully");
  });
}

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to the database");
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to the database", error);
});

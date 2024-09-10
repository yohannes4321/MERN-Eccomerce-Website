const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/routes');
const path=require("path")
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cookieParser());
app.use(express.json()); // For parsing JSON request bodies

// Routes
app.use("/api", router);

const PORT = process.env.PORT || 8080;
/////////////////////////////////////////////////////////////

const __dirname1= path.resolve();
if (process.env.NODE_ENV==="production"){
app.use(express.static(path.join(__dirname1,"/Frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"Frontend","build","index.html"))
})
}
else{
    app.get("/",(req,res)=>{
        res.send("API IS Running Successfully")
    })
}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to the database");
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
});

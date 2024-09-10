const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email.");
    }
    if (!password) {
      throw new Error("Please provide password.");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found.");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("Password check result:", checkPassword);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };

      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 24 });
      console.log("Generated JWT:", token);

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false, // Set to false if not in production
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // Adjust based on environment
      };
      
      res.cookie("token", token, cookieOptions).status(200).json({
        message: "Login successfully.",
        token: token,
        success: true,
        error: false,
      });
      

    } else {
      throw new Error("Incorrect password.");
    }

  } catch (err) {
    console.error("Sign-in error:", err);
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;

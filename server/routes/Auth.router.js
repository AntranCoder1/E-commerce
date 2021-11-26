const express = require('express');
const router = express.Router();
const User = require('../models/User.models');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// @router api/auth/register
// @desc POST auth
// @access Public
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
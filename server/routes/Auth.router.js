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

// @router api/auth/login
// @desc POST auth
// @access Public
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });

        !user && res.status(401).json({success: false, message: 'Wrong User Name' })

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;

        originalPassword != inputPassword && 
            res.status(401).json({ success: false, message: 'Wrong Password' });

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.PASS_SEC, {
                expiresIn: "3d"
            }
        );

        const { password, _id, email, createdAt, updatedAt, __v, ...orthers } = user._doc;
        res.status(200).json({ ...orthers, accessToken });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
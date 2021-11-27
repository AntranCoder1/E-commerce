const express = require('express');
const router = express.Router();
const User = require('../models/User.models');
const { 
    verifyToken, 
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../verifyToken');

// @router api/users/
// @desc PUT users
// @access Private
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @router api/users/:id
// @desc DELETE users
// @access Private
router.delete("/:id", verifyTokenAndAuthorization, async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted...');
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @router api/users/find/:id
// @desc GET users
// @access Private
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const getUser = await User.findById(req.params.id);
        const { password, ...other } = getUser._doc;
        res.status(200).json({ ...other });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
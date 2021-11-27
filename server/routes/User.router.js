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

// @router api/users/
// @desc GET ALL users
// @access Private
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? 
            await User.find().sort({ _id: -1 }).limit(5) : 
            await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.sendStatus(500).json({ success: false, message: 'Internal server error' });
    }
});

// @router api/users/tasts
// @desc GET stats users
// @access Private
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.getFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
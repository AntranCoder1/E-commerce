const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart.models');
const {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndAuthorization
} = require('../verifyToken');

// @router appi/carts
// @desc POST carts
// @access Private
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.saved();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
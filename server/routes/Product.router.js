const express = require('express');
const router = express.Router();
const Product = require('../models/Product.models');
const { 
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
} = require('../verifyToken');

// @router api/products/
// @desc POST products
// @access Private
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @router api/products/:id
// @desc PUT products
// @access Private
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
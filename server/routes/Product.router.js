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

// @router api/products/:id
// @desc DELETE products
// @access Private
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Product has been deleted...');
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @router api/products/find/:id
// @desc GET products
// @access Private
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// @router api/products/
// @desc GET All products
// @access Private
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategories = req.query.category;
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategories) {
            products = await Product.find({
                categories: {
                    $in: [qCategories],
                },
            });
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config"); // Multer configuration for file uploads
const productModel = require("../models/product-model"); // Import the product model

// GET route to render the form
router.get("/create", (req, res) => {
    res.render("createproduct"); // Render a form for creating a product (EJS template named "createproduct")
});

// POST route to handle form submission and create a product
router.post("/create", upload.single("image"), async (req, res) => {
    try {
        const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
        
        // Create a new product with image and other details
        const newProduct = new productModel({
            image: req.file.buffer, // Store image data as buffer
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });
 
        await newProduct.save();
        req.flash("success","product created successfully");
        res.redirect("/owners/admin");
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send("Server error: Could not create product.");
    }
});

module.exports = router;

// productSchema.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: Buffer, // Use Buffer type to store binary data
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String
});

module.exports = mongoose.model("product", productSchema);

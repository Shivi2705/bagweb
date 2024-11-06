const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: { type: String, minLength: 3, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    orders: { type: Array, default: [] },
    contact: Number,
    picture: String,
});

module.exports = mongoose.model("User", userSchema);

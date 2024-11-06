const jwt = require("jsonwebtoken");
const userModel = require("../models/user-models");

module.exports = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        req.flash("error", "You need to log in first");
        return res.redirect("/");
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findOne({ email: decoded.email }).select("-password");
        next();
    } catch (err) {
        console.error("Authorization error:", err);
        req.flash("error", "Something went wrong");
        res.redirect("/");
    }
};

const userModel = require("../models/user-models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports = {
    registerUser: async (req, res) => {
        try {
            const { email, password, fullname } = req.body;
            const existingUser = await userModel.findOne({ email });
            if (existingUser) return res.status(401).send("Account already exists");

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userModel.create({ email, password: hashedPassword, fullname });

            const token = generateToken(user);
            res.cookie("token", token).send("User created successfully");
        } catch (error) {
            console.error("Registration error:", error.message);
            res.status(500).send("Server error");
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (!user) return res.status(401).send("Invalid credentials");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).send("Invalid credentials");

            const token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop");
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).send("Server error");
        }
    },
    logout: (req, res) => {
        res.cookie("token", "");
        res.redirect("/");
    }
};

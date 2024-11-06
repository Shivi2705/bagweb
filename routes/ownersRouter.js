const express = require("express");
const router = express.Router();
const ownerModel=require("../models/owner-model");

router.get("/admin", (req, res) => {
    const success = req.flash("success");
    res.render("createproducts", { success });
});

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(403).send("Permission denied");
        }

        const { fullname, email, password, gstin } = req.body;
        try {
            const createdOwner = await ownerModel.create({ fullname, email, password, gstin });
            res.status(201).send(createdOwner);
        } catch (error) {
            res.status(500).send("Server error: Could not create owner.");
        }
    });
}



module.exports = router;

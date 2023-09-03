const express = require('express');
const router = express.Router();

const { animalsCollection } = require("../../mongo");

router.get("/categories", async (req, res) => {

    try {
        const animals = await animalsCollection.find({})

        res.json(animals);
    } catch (e) {
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
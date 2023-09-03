const express = require('express');
const router = express.Router();
const storage = require('../../middleware/storage')

const { animalCollection } = require("../../mongo");

router.put("/UpdateAnimal", async (req, res) => {

    const {
        name,
        subcategories
    } = req.body;

    let data = {
        name: name,
        subcategories: subcategories
    };

    try {
        await animalsCollection.updateOne({
            _id: id
        }, 
        {
            $set: data
        });

        res.json("success");
    } catch (e) {
        
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
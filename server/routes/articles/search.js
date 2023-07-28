const express = require('express');
const router = express.Router();

const { articleCollection } = require("../../mongo");

router.get("/article/search/:value", async (req, res) => {

    const value = req.params.value;

    await articleCollection
    .find({
        $or: [
            { title: {$regex: value} },
            { description: {$regex: value} }
        ]
    })
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(400).json(err)
    })
})

module.exports = router
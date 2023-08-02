const express = require('express');
const router = express.Router();

const { articleCollection } = require("../../mongo");

router.get("/slider", (req, res) => {
    articleCollection.aggregate([
        { $match: { recommanded: true } },
        { $sample: { size: 5 } }
    ])
    .then(articles => {
        res.json(articles);
    })
    .catch(error => {
        console.log(error);
        res.json("fail");
    });
});

module.exports = router
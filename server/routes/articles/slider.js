const express = require('express');
const router = express.Router();

const { articleCollection } = require("../../mongo");

router.get("/slider", (req, res) => {
    articleCollection.aggregate([
        { $match: { $and: [ { recommanded: true }, { stock: { $gt: 0 } } ] } },
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
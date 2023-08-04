const express = require('express');
const router = express.Router();

const { mainArticleCollection } = require("../../mongo");

router.get("/slider", (req, res) => {
    mainArticleCollection.aggregate([
        { $match: { $and: [ { recommanded: true }, { stock: { $gt: 0 } } ] } },
        { $sample: { size: 5 } }
    ])
    .then(articles => {
        console.log(articles);
        res.json(articles);
    })
    .catch(error => {
        console.log(error);
        res.json("fail");
    });
});

module.exports = router
const express = require('express');
const router = express.Router();

const { articleCollection } = require("../../mongo");

router.get("/slider/:type", (req, res) => {

    let request = null;

    if (req.params.type === "promotions") {
        request = { $match: { $and: [ { reduction: { $gt: 0 } }, { stock: { $gt: 0 } } ] } };
    } else if (req.params.type === "recommanded") {
        request = { $match: { $and: [ { recommanded: true }, { stock: { $gt: 0 } } ] } };
    } else if (req.params.type === "newArticles") {
        request = { $match: { $and: [ { $or: [ { isNewState: "new" }, { isNewState: "forced" } ] }, { stock: { $gt: 0 } } ] } };
    }

    articleCollection.aggregate([
        request,
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

module.exports = router;

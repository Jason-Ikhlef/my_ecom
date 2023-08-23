const express = require('express');
const router = express.Router();
const storage = require('../../middleware/storage')
const mongoose = require('mongoose')

const { articleCollection } = require("../../mongo");

router.post("/AddOpinions/:id", async (req, res) => {

    const {
        id
    } = req.params;

    const {
        opinions
    } = req.body;

    try {
        const article = await articleCollection.findById(id);

        console.log(opinions);

        if (!article.opinions) {
            article.opinions = [];
        }

        article.opinions.push(...opinions);
        await article.save();
    } catch (e) {
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
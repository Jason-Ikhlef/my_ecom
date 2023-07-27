const express = require('express');
const router = express.Router();

const { articleCollection } = require("../../mongo");

router.get("/articles", async (req, res) => {

    try {
        const articles = await articleCollection.find({});
        res.json(articles);
    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
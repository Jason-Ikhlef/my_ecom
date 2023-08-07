const express = require('express');
const router = express.Router();

const { mainArticleCollection, articleCollection } = require("../../mongo");

router.get("/articles", async (req, res) => {

    try {
        const mainArticles = await mainArticleCollection.find({}).populate('articles').exec();
        const firstArticles = mainArticles.map(mainArticle => mainArticle.articles[0]);
        res.json(firstArticles);
    } catch (e) {
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
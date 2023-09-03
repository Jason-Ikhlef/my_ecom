const express = require('express');
const router = express.Router();

const { mainArticleCollection, articleCollection } = require("../../mongo");
const { ObjectId } = require('mongodb');

router.get("/article/:id", async (req, res) => {
    const { id } = req.params;
    let parent = null;

    try {
        const mainArticle = await mainArticleCollection.find({}).populate('articles').exec();

        mainArticle.forEach(async (element) => {
            for (let i = 0; i < element.articles.length; i++) {
                
                if (element.articles[i]._id.toString() === id) {
                    parent = element;
                }
            }
        });

        if (!parent) {
            return res.status(404).json({
                message: "Article introuvable"
            });
        }
        res.json(parent);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la récupération de l'article"
        });
    }
})

module.exports = router
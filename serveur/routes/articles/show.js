const express = require('express');
const router = express.Router();

const { articleCollection } = require("../../mongo");

router.get("/article/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const article = await articleCollection.findOne({
            _id: id
        });

        if (!article) {
            return res.status(404).json({
                message: "Article introuvable"
            });
        }
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la récupération de l'article"
        });
    }
})

module.exports = router
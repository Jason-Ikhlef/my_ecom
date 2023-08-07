const express = require('express');
const router = express.Router();

const { categoriesCollection } = require("../../mongo");

router.post("/showCategories", async (req, res) => {
    try {
        const animal = await categoriesCollection.findOne({
            _id: id
        });

        if (!animal) {
            return res.status(404).json({
                message: "Catégorie d'animaux introuvable"
            });
        }
        res.json(animal);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la récupération de la catégorie d'animaux"
        });
    }
})

module.exports = router
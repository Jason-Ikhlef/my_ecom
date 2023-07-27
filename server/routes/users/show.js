const express = require('express');
const router = express.Router();

const { userCollection } = require("../../mongo");

router.get("/user/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userCollection.findOne({
            _id: id
        });

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur"
        });
    }
})

module.exports = router
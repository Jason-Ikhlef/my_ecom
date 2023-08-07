const express = require('express');
const router = express.Router();

const { articleCollection } = require("../../mongo");

router.delete("/DeleteArticle/:id", async (req, res) => {

    const { id } = req.params

    try {
        await articleCollection.deleteOne({_id: id});
        res.json("success");
    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
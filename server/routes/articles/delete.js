const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs')

const { articleCollection } = require("../../mongo");

router.delete("/DeleteArticle/:id", async (req, res) => {

    const { id } = req.params
    const uploadDir = path.join(__dirname, '../../storage');

    try {
        const article = await articleCollection.findOne({_id: id});

        article.pictures.forEach(element => {
            try {
                fs.unlinkSync(uploadDir + '/' + element)
              } catch(err) {
                console.error(err)
              }
        });

        await articleCollection.deleteOne({_id: id});
        res.json("success");
    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
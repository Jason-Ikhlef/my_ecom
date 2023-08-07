const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs')

const {
    articleCollection,
    mainArticleCollection
} = require("../../mongo");

router.delete("/DeleteArticle/:id", async (req, res) => {

    const {
        id
    } = req.params
    const uploadDir = path.join(__dirname, '../../storage');

    try {
        const article = await articleCollection.findOne({
            _id: id
        });

        const group = await mainArticleCollection.findOne({articles: id})

        article.pictures.forEach(element => {
            try {
                fs.unlinkSync(uploadDir + '/' + element)
            } catch (err) {
                console.error(err)
            }
        });

        await articleCollection.deleteOne({
            _id: id
        });

        if (group.articles.length === 1) {
            await mainArticleCollection.deleteOne({
                _id: group._id
            })
        }

        res.json("success");
    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
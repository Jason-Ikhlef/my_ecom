const express = require('express');
const router = express.Router();
const storage = require('../../middleware/storage')

const { articleCollection } = require("../../mongo");

router.put("/AddArticle", storage.upload.array('photo'), async (req, res) => {

    const {
        title,
        description,
        price,
        caracteristics,
    } = req.body;

    const picturesNames = req.files.map(file => file.filename);
        
    let data = {
        title: title,
        description: description,
        price: price,
        caracteristics: caracteristics,
        pictures: picturesNames
    };
    
    try {
        await articleCollection.create(data);
        res.json("success");
    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
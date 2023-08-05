const express = require('express');
const router = express.Router();
const storage = require('../../middleware/storage')

const { articleCollection } = require("../../mongo");

router.put("/UpdateArticle", storage.upload.array('photo'), async (req, res) => {

    const {
        title,
        description,
        price,
        caracteristics,
        id,
        stock,
        animal,
        category,
        subCategory,
        animalsName,
        categoriesName,
        subCategoriesName,
        recommanded: recommanded,
        pictures
    } = req.body;

    const picturesNames = req.files.map(file => file.filename);

    if (pictures.length > 0) {
        const picturesArray = pictures.split(/\s*,\s*/)
        picturesArray.forEach(element => {
            picturesNames.push(element);
        });
    }

    let data = {
        title: title,
        description: description,
        price: price,
        caracteristics: caracteristics,
        pictures: picturesNames,
        stock,
        animal,
        category,
        subCategory,
        animalsName,
        categoriesName,
        subCategoriesName,
        recommanded
    };

    try {

        await articleCollection.updateOne({
            _id: id
        }, 
        {
            $set: data
        });

        res.json("success");
    } catch (e) {
        
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
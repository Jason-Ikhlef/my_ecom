const express = require('express');
const router = express.Router();
const storage = require('../../middleware/storage')
const path = require('path');
const fs = require('fs')

const {
    articleCollection
} = require("../../mongo");

router.put("/UpdateArticle", storage.upload.array('photo'), async (req, res) => {

    let {
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
        pictures,
        weight,
        newArticle,
        reduction
    } = req.body;

    let isNewState = newArticle

    const uploadDir = path.join(__dirname, '../../storage');
    const picturesNames = req.files.map(file => file.filename);
    let picturesArray = [];
    let finalArray = [];

    if (pictures.length > 0) {
        picturesArray = pictures.split(/\s*,\s*/)
        picturesArray.forEach(element => {
            finalArray.push(element);
        });
    }

    if (picturesNames.length > 0) {
        picturesNames.forEach(element => {
            finalArray.push(element);
        });
    }

    let data = {
        title: title,
        description: description,
        price: price,
        caracteristics: caracteristics,
        pictures: finalArray,
        stock,
        animal,
        category,
        subCategory,
        animalsName,
        categoriesName,
        subCategoriesName,
        recommanded,
        weight,
        isNewState
        reduction
    };
    
    try {

        const article = await articleCollection.findOneAndUpdate({
            _id: id
        }, {
            $set: data
        });

        let intersection = article.pictures.filter(x => !finalArray.includes(x));

        intersection.forEach(element => {
            try {
                fs.unlinkSync(uploadDir + '/' + element)
            } catch (err) {
                console.error(err)
            }
        });

        res.json("success");
    } catch (e) {

        console.log(e);
        res.json("fail");
    }
});

module.exports = router
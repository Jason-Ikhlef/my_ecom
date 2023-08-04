const express = require('express');
const router = express.Router();
const storage = require('../../middleware/storage')
const mongoose = require('mongoose')

const { mainArticleCollection, articleCollection } = require("../../mongo");

router.put("/AddArticle", storage.upload.array('photo'), async (req, res) => {

    const {
        title,
        description,
        price,
        caracteristics,
        stock,
        animal,
        category,
        subCategory,
        animalsName,
        categoriesName,
        subCategoriesName,
        recommanded,
        property
    } = req.body;

    const picturesNames = req.files.map(file => file.filename);

    let groupName = "Article group " + title;

    let obj = {};

    obj[property] = {
        title: title,
        description: description,
        price: price,
        caracteristics: caracteristics,
        pictures: picturesNames,
        stock: stock,
        animals: animal,
        categories: category,
        subCategories: subCategory,
        animalsName: animalsName,
        categoriesName: categoriesName,
        subCategoriesName: subCategoriesName,
        recommanded: recommanded,
    }
    
    console.log(obj);

    try {
        let group = await mainArticleCollection.findOne({name: groupName});

        if (group === null) {
            
            group = new mainArticleCollection({
                name: groupName,
                article: []
            });

            group = await mainArticleCollection.create(group);

        }

        group.article.push(obj);
        group.save()

        console.log(group);

    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }

    // try {
    //     const prout = await mainArticleCollection.findOne({name: "grosse catégorie"})

    //     prout.article.forEach((element, key) => {
    //         for (const [index, value] of Object.entries(element)) {
    //             console.log(`${index}: ${value}`);
    //             for (const [sdfsd, test] of Object.entries(value)) {
    //               console.log(`${sdfsd}: ${test}`);
    //             }
    //           }
    //     });


    //     res.json("success");
    // } catch (e) {
    //     // voir pour envoyer des messages plus clairs en fonction des erreurs
    //     console.log(e);
    //     res.json("fail");
    // }
});

module.exports = router
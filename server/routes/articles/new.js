const express = require('express');
const router = express.Router();
const storage = require('../../middleware/storage')
const mongoose = require('mongoose')

const { mainArticleCollection, articleCollection } = require("../../mongo");

router.put("/AddArticle", async (req, res) => {

    // const {
    //     title,
    //     description,
    //     price,
    //     caracteristics,
    //     stock,
    //     animal,
    //     category,
    //     subCategory,
    //     animalsName,
    //     categoriesName,
    //     subCategoriesName,
    //     recommanded
    // } = req.body;

    // const picturesNames = req.files.map(file => file.filename);

    let obj = {};
    obj["rose"] = {
        title: "Kong pour chien",
        description: "C'est la description",
        price: 12,
        caracteristics: "caracteristics",
        pictures: [],
        stock: 12,
        animals: new mongoose.Types.ObjectId("64c8caafe46fd1be7b7e7e21"),
        categories: new mongoose.Types.ObjectId("64c8cac5e46fd1be7b7e7e2a"),
        subCategories: new mongoose.Types.ObjectId("64c8cb5024b649a9bb638d10"),
        animalsName: "Chien",
        categoriesName: "Jouets",
        subCategoriesName: "Kong",
        recommanded: false
    }

    try {
        const prout = await mainArticleCollection.findOne({name: "grosse catégorie"})

        prout.article.forEach((element, key) => {
            for (const [index, value] of Object.entries(element)) {
                console.log(`${index}: ${value}`);
                for (const [sdfsd, test] of Object.entries(value)) {
                  console.log(`${sdfsd}: ${test}`);
                }
              }
        });


        res.json("success");
    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
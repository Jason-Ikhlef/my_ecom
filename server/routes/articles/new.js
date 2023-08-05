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
        property,
        weight,
        groupName,
        pictures
    } = req.body;

    console.log(pictures !== null)

    const picturesNames = req.files.map(file => file.filename);

    if (pictures.length !== null) {
        const picturesArray = pictures.split(/\s*,\s*/)
        console.log(picturesArray);
        picturesNames.forEach(element => {
            picturesArray.push(element);
        });
    }

    console.log(picturesArray);

    if (groupName === null) {
        groupName = "Article group " + title;
    }


    let obj = {
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
        weight: weight,
        property: property
    }

//     try {
//         let group = await mainArticleCollection.findOne({ name: groupName });

//         if (group === null) {
//             group = new mainArticleCollection({
//                 name: groupName,
//                 articles: []
//             });
//             group = await group.save();
//         }

//         const article = new articleCollection(obj);
//         await article.save();

//         group.articles.push(article._id);
//         await group.save();

//         res.json("success");

//     } catch (e) {
//         console.log(e);
//         res.json("fail");
//     }
});

module.exports = router
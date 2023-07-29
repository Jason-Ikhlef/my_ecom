const express = require('express');
const router = express.Router();

const {
    animalsCollection,
    categoriesCollection,
    subCategoriesCollection
} = require("../../mongo");

router.post("/NewCategory", async (req, res) => {

    const {
        animals,
        category,
        subCategory
    } = req.body;

    let animal, group, series = null;

    if (animals) {

        animal = await animalsCollection.find({
            name: animals,
        });

        if (animal.length === 0) {
            animal = new animalsCollection({
                name: animals
            });
    
            try {
                await animal.save();
                console.log('animal category saved');
            } catch (e) {
                // voir pour envoyer des messages plus clairs en fonction des erreurs
                console.log(e);
                res.json("fail");
            }
        }
    }

    if (category) {

        let flag = false;

        animal[0].categories.forEach(element => {

            if (element.name === category) {
                flag = true;
            }
        });

        if (!flag) {
            try {
                group = new categoriesCollection({
                    name: category,
                    categories: category
                })

                await group.save()
                animal[0].categories.push(group);

                console.log('category saved');

            } catch (e) {
                // voir pour envoyer des messages plus clairs en fonction des erreurs
                console.log(e);
                res.json("fail");
            }
        }
    }

    if (subCategory) {
        series = new subCategoriesCollection({
            name: subCategory,
            subCategories: subCategory
        })

        try {
            await series.save();
            console.log('subcategory saved');
        } catch (e) {
            // voir pour envoyer des messages plus clairs en fonction des erreurs
            console.log(e);
            res.json("fail");
        }
    }

    if (series) {
        animal.categories[0].subCategories.push(series);
    }

    await animalsCollection.create(animal);
});

module.exports = router
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

    let animal, group, series, idCat = null;

    if (animals === "" || animals === null) {
        return;
    }

    animal = await animalsCollection.findOne({
        name: animals
    });

    if (animal === null) {
        animal = new animalsCollection({
            name: animals
        });

        try {
            await animal.save();
            animal = await animalsCollection.findOne({
                name: animals
            });
            console.log('animal category saved');
        } catch (e) {
            console.log(e);
            res.json("fail");
        }
    }

    if (category === '' || category === null) {
        return;
    }

    let flag = false;

    if (animal.categories.length > 0) {

        animal.categories.forEach(element => {
            if (element.name === category) {
                idCat = animal.categories.indexOf(element);
                flag = true;
            }
        });
    }

    if (!flag) {
        try {
            group = new categoriesCollection({
                name: category,
                categories: category
            })

            await group.save()
            animal.categories.push(group);

            console.log('category saved');

        } catch (e) {
            res.json("fail");
        }
    }

    if (subCategory === '' || subCategory === null) {
        return;
    }

    if (subCategory !== '' && subCategory !== null) {

        flag = false;

        if (idCat === null) {
            idCat = (animal.categories.length) - 1;
        }

        animal.categories[idCat].subCategories.forEach(element => {
            if (element.name === subCategory) {
                flag = true;
            }
        })

        if (!flag) {
            series = new subCategoriesCollection({
                name: subCategory,
                subCategories: subCategory
            })

            try {
                await series.save();
                animal.categories[idCat].subCategories.push(series);
                console.log('subcategory saved');
            } catch (e) {
                console.log(e);
                res.json("fail");
            }
        }
    }
    await animalsCollection.create(animal);
});

module.exports = router
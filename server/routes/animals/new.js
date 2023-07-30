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

    if (animals !== '') {
        animal = await animalsCollection.find({
            name: animals
        });

        if (animal.length === 0) {
            animal = new animalsCollection({
                name: animals
            });
            
            try {
                await animal.save();
                animal = await animalsCollection.find({
                    name: animals
                });
                console.log('animal category saved');
            } catch (e) {
                // voir pour envoyer des messages plus clairs en fonction des erreurs
                console.log(e);
                res.json("fail");
            }
        }
    }
    

    if (category !== '') {

        let flag = false;
        
        animal[0].categories.forEach(element => {
            if (element.name === category) {
                idCat = animal[0].categories.indexOf(element);
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
                res.json("fail");
            }
        }
    }

    if (subCategory !== '') {

        flag = false;

        if (!idCat) {
            idCat = (animal[0].categories.length)-1;
        }

        animal[0].categories[idCat].subCategories.forEach(element => {
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
                animal[0].categories[idCat].subCategories.push(series);
                console.log('subcategory saved');
            } catch (e) {
                // voir pour envoyer des messages plus clairs en fonction des erreurs
                console.log(e);
                res.json("fail");
            }
        }
    }
    await animalsCollection.create(animal);
});

module.exports = router
const express = require('express');
const router = express.Router();
const storage = require('../../middleware/storage')

const { animalsCollection, categoriesCollection, subCategoriesCollection } = require("../../mongo");

router.post("/NewCategory", async (req, res) => {
    const {animals, category, subCategory} = req.body;

    if(animals){
        const animal = new animalsCollection({
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

        if(category){
            const group = new categoriesCollection({
                name: category,
                categories: category
            })
            try {
                await group.save()
                console.log('category saved');
            } catch (e) {
                // voir pour envoyer des messages plus clairs en fonction des erreurs
                console.log(e);
                res.json("fail");
            }
            
            if(subCategory){
                const series = new subCategoriesCollection({
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
                
                animal.categories.push(group);
                animal.categories[0].subCategories.push(series);
            }

            await animalsCollection.create(animal);
        }
    }
});

module.exports = router
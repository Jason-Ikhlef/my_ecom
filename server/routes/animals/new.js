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
            const categories = new categoriesCollection({
                categories: category
            })
            console.log(categories);
            try {
                await categories.save()
                console.log('category saved');
            } catch (e) {
                // voir pour envoyer des messages plus clairs en fonction des erreurs
                console.log(e);
                res.json("fail");
            }
            
            if(subCategory){
                const subCategories = new subCategoriesCollection({
                    subCategories: subCategory
                })
                
                try {
                    await subCategories.save();
                    console.log('subcategory saved');
                } catch (e) {
                    // voir pour envoyer des messages plus clairs en fonction des erreurs
                    console.log(e);
                    res.json("fail");
                }

                await animals.push({categories});
                await categories.push({subCategories});
            }
        }
    }
});

module.exports = router
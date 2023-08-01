const express = require('express');
const router = express.Router();

const { 
    animalsCollection,
    categoriesCollection,
    subCategoriesCollection
} = require("../../mongo");

router.post("/DeleteCategory", async (req, res) => {
    const {
        animals,
        category,
        subCategory
    } = req.body;

    let animal, group, series, idCat = null;

    console.log(req.body);

    animal = await animalsCollection.findOne({
        name: animals
    });

    if (category === '') {
        try {
            await animal.deleteOne({ animal });
            console.log('Animal deleted');
        } catch (e) {
            // voir pour envoyer des messages plus clairs en fonction des erreurs
            console.log(e);
            res.json("fail");
        }
    }

    if (category !== '') {
        animal.categories.forEach(element => {
            if (element.name === category) {
                idCat = animal.categories.indexOf(element);
            }
        });

        if (subCategory === '') {
            try {
                await animal.categories.remove({ _id: animal.categories[idCat]._id });
                animal.save();
                console.log('Category deleted');
            } catch (e) {
                // voir pour envoyer des messages plus clairs en fonction des erreurs
                console.log(e);
                res.json("fail");
            }
        }
    }

    if (subCategory !== '') {
        animal.categories[idCat].subCategories.forEach(async element => {
            if (element.name === subCategory) {
                console.log(element);
                try {
                    await animal.categories[idCat].subCategories.remove({ _id: element._id });
                    animal.save();
                    console.log('SubCategory deleted');
                } catch (e) {
                    // voir pour envoyer des messages plus clairs en fonction des erreurs
                    console.log(e);
                    res.json("fail");
                }
            }
        })
    }
});

module.exports = router
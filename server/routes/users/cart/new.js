const express = require('express');
const router = express.Router();

const { userCollection, googleCollection, facebookCollection } = require("../../../mongo");

router.post("/addToCart", async(req, res) => {

    const userId = req.session.user.id
    const auth = req.session.user.auth
    
    const {
        articleId,
        quantity,
        img,
        name,
        price,
        weight
    } = req.body;

    switch(auth) {

        case 'petheaven': {
            collection = userCollection
            break;
        }
        case 'google': {
            collection = googleCollection
            break;
        }
        case 'facebook': {
            collection = facebookCollection
            break;
        }
    }

    await collection
    .findById(userId)
    .then(user => {

        const articleExists = user.cart.find(item => item.articleId === articleId)

        articleExists ? articleExists.quantity += quantity : user.cart.push({ articleId, name, price, quantity, img , weight})

        user.markModified('cart');
        user.save()
        req.session.user.cart = user.cart
        res.status(200).json(user.cart)
    })
    .catch(err => {
        console.error(err)
        res.status(400).json(err)
    })
 
})

module.exports = router
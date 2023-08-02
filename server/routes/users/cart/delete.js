const express = require('express');
const router = express.Router();

const { userCollection, googleCollection, facebookCollection } = require("../../../mongo");

router.delete("/removeFromCart", async(req, res) => {

    const userId = req.session.user.id
    const auth = req.session.user.auth
    
    const {
        articleId
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

        const article = user.cart.find(item => item.articleId === articleId)
        const index = user.cart.indexOf(article);

        if (index !== -1) {
            user.cart.splice(index, 1);
        }

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
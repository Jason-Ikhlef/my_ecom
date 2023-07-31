const express = require('express');
const router = express.Router();

const { userCollection, googleCollection, facebookCollection } = require("../../../mongo");

router.post("/addToCart", async(req, res) => {

    const userId = req.session.user.id
    const auth = req.session.user.auth
    
    const {
        articleId,
        quantity
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
    .then(response => {
        response.cart.push({ articleId, quantity })
        res.status(200).json(response.cart)
    })
    .catch(err => {
        res.status(400).json(err)
    })
 
})

module.exports = router
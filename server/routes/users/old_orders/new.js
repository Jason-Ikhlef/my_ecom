const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const { userCollection, googleCollection, facebookCollection } = require("../../../mongo");

router.post("/newOrder", async(req, res) => {

    const userId = req.session.user.id
    const auth = req.session.user.auth
    const ObjectId = mongoose.Types.ObjectId;

    const { cart, totalPrice } = req.body
    
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

        user.old_orders.push({cart, totalPrice, date: new Date(), _id: new ObjectId()})
        user.cart = []
        user.markModified('cart');
        user.markModified('old_orders');
        user.save()
        req.session.user.cart = user.cart
        req.session.user.old_orders = user.old_orders
        res.status(200).json(user.old_orders)
    })
    .catch(err => {
        console.error(err)
        res.status(400).json(err)
    })
 
})

module.exports = router
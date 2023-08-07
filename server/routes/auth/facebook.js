const express = require('express');
const router = express.Router();

const { facebookCollection } = require("../../mongo");

let user = null

router.post('/createFacebook', async (req, res) => {

    const {
        email,
    } = await req.body.data;

    const storage = await req.body.storage

    const data = {
        email: email
    }

    await userExists(email)

    if (user) {
        if (storage.length > 0) user.cart = storage
        user.markModified('cart');
        user.save()
        req.session.user = { id: user._id, email: user.email, admin : user.admin, cart: user.cart, old_orders: user.old_orders, auth: 'facebook' }
        res.status(200).json("success")
    } else {
        await facebookCollection
        .create(data)
        .then(response => {
            if (storage.length > 0) response.cart = storage
            response.markModified('cart');
            response.save()
            req.session.user = { id: response._id, email: response.email, admin : response.admin, cart: response.cart, old_orders: response.old_orders, auth: 'facebook' }
            res.status(200).json("success")
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
})

async function userExists(email) {

    await facebookCollection
    .findOne({ 
        email: email, 
    })
    .then(response => {

        response ? user = response : user = null
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = router
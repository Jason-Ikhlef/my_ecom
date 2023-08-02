const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { userCollection } = require("../../mongo");

router.post('/login', async (req, res) => {

    const {
        email,
        password
    } = await req.body;

    const hash = crypto.createHash('sha1').update(JSON.stringify(password)).digest('hex')

    await userCollection
    .findOne({ 
        email: email, 
        password: hash,
    })
    .then(user => {
        if (user) {
            req.session.user = { id: user._id, email: user.email, admin : user.admin, cart: user.cart, old_orders: user.old_orders, auth: 'petheaven' }
            res.status(200).json("success")
        } else {
            res.status(400).json("nom de compte ou mot de passe incorrect")
        }
    })
    .catch(err => {
        console.log(err)
        res.status(400).json("fail")
    })     
})

module.exports = router
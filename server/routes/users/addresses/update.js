const express = require('express');
const router = express.Router();

const { userCollection, facebookCollection, googleCollection } = require("../../../mongo");

router.put("/updateAddress", async(req, res) => {
    
    const userId = req.session.user.id
    const auth = req.session.user.auth
    let collection

    const {data, index} = req.body

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
        const addresses = user.data.addresses;
        addresses[index] = data
        user.markModified('data');
        user.save()

        req.session.user.data.addresses = user.data.addresses
        res.status(200).json(user.data.addresses)
    })
    .catch(err => {
        res.status(400).json(err)
    })

})

module.exports = router
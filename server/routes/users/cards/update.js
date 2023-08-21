const express = require('express');
const router = express.Router();

const { userCollection, facebookCollection, googleCollection } = require("../../../mongo");

router.put("/updateCard", async(req, res) => {
    
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
        const cards = user.data.cards;
        cards[index] = data
        user.markModified('data');
        user.save()

        req.session.user.data.cards = user.data.cards
        res.status(200).json(user.data.cards)
    })
    .catch(err => {
        res.status(400).json(err)
    })

})

module.exports = router
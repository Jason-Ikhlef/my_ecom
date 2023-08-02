const express = require('express');
const router = express.Router();

const { userCollection, googleCollection, facebookCollection } = require("../../../mongo");

router.post("/getOldOrders", async(req, res) => {

    const userId = req.session.user.id
    const auth = req.session.user.auth
    
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

        res.status(200).json(user.old_orders)
    })
    .catch(err => {
        console.error(err)
        res.status(400).json(err)
    })
 
})

module.exports = router
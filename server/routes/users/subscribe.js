const express = require('express');
const router = express.Router();


const { userCollection, googleCollection, facebookCollection } = require("../../mongo");

router.post("/subscribe", async(req, res) => {
    const duration = req.body.duration;
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
        if(duration === "month"){
            user.subscribed.month = true;

        }
        else{
         user.subscribed.year = true;
            
        }
        user.markModified('subscribed');
        user.save()
        req.session.user.subscribe = user.subscribed
        res.status(200).json(user.subscribed)
    })
    .catch(err => {
        console.error(err)
        res.status(400).json(err)
    })
    
});


module.exports = router;

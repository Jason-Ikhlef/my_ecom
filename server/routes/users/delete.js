const express = require('express');
const router = express.Router();

const { userCollection, facebookCollection, googleCollection } = require("../../mongo");

router.delete("/deleteUser/:id", async (req, res) => {

    let userId = req.params.id;
    let auth = req.session.user.auth
    let collection

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

    try {
        await collection.deleteOne({
            _id: userId
        });
        res.json("success");
    } catch (e) {
        console.log(e);
        res.json("fail");
    }

    if (userId === req.session.user.id) {

        req.session.destroy();
    }
});

module.exports = router
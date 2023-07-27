const express = require('express');
const router = express.Router();

const { userCollection } = require("../../mongo");

router.put("/UpdateUser/:id", async(req, res) => {
    
    let userId = req.body.id;

    const {
        email,
        password
    } = req.body.data;

    let data = {
        email: email,
        password: password
    };

    try {
        await userCollection.updateOne({
            _id: userId
        }, 
        {
            $set: data
        });
        res.json("success");
    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }
})

module.exports = router
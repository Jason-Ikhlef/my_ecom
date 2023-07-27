const express = require('express');
const router = express.Router();

const { userCollection } = require("../../mongo");

router.post("/UpdateUser/:id", async(req, res) => {
    
    let userId = req.params.id;

    const {
        email,
        password
    } = req.body;

    let data = {
        email: email,
        password: password
    };

    try {
        await articleCollection.updateOne({
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
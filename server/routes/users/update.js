const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { userCollection } = require("../../mongo");

router.put("/UpdateUser/:id", async(req, res) => {
    
    let userId = req.body.id;

    const {
        email,
        password
    } = req.body.data;

    let data = {
        email: email,
        password: crypto.createHash('sha1').update(JSON.stringify(password)).digest('hex')
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
        console.log(e);
        res.json("fail");
    }
})

module.exports = router
const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { userCollection } = require("../../mongo");

router.post("/createUser", async(req, res) => {
    
    const {
        email,
        password
    } = req.body;

    console.log(req.body);

    let data = {
        email: email,
        password: crypto.createHash('sha1').update(JSON.stringify(password)).digest('hex')
    };

    try {
        await userCollection.create(data);
        res.json("success");
    } catch (e) {
        console.log(e);
        res.json("fail");
    }
})

module.exports = router
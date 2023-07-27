const express = require('express');
const router = express.Router();

const { userCollection } = require("../../mongo");

router.post("/createUser", async(req, res) => {
    const {
        email,
        password
    } = req.body;

    let data = {
        email: email,
        password: password
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
const express = require('express');
const router = express.Router();

const { userCollection } = require("../../mongo");

router.get("/users", async (req, res) => {

    try {
        const users = await userCollection.find({});
        res.json(users);
    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
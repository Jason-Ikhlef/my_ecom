const express = require('express');
const router = express.Router();

const { userCollection } = require("../../mongo");

router.delete("/deleteUser/:id", async (req, res) => {

    let userId = req.params.id;

    try {
        await userCollection.deleteOne({
            _id: userId
        });
        res.json("success");
    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }

    if (userId === req.session.user.id) {

        req.session.destroy();
    }
});

module.exports = router
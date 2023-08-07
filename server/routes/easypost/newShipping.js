const express = require("express");
const router = express.Router();
const { appCollection } = require("../../mongo");

router.post('/changeShipping', async (req, res) => {

    const newShipping = req.body

    console.log(req.body);

    await appCollection
    .findOne()
    .then(app => {
        app.shipping = newShipping.shipping
        app.save()
        res.status(200).json(app)
    })
    .catch(err => {
        console.log(err);
    })

})

module.exports = router
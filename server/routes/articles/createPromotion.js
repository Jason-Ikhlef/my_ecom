const express = require("express");
const router = express.Router();
const { appCollection } = require("../../mongo");

router.post('/createPromotion', async (req, res) => {

    const {
        startDate,
        endDate,
        promotion,
        salePeriod
    } = req.body

    await appCollection
    .findOne()
    .then(app => {
        app.startDate = startDate,
        app.endDate = endDate,
        app.promotion = promotion,
        app.salePeriod = salePeriod,
        app.save()
        res.status(200).json(app)
    })
    .catch(err => {
        console.log(err);
    })

})

module.exports = router
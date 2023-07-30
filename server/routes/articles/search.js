const express = require('express');
const router = express.Router();

const { articleCollection } = require("../../mongo");

router.post("/article/search", async (req, res) => {
    
    const {
        animals,
        search
    } = req.body;

    if (animals !== '' && search !== '') {
        await articleCollection.find({
            $and: [
                { animalsName: animals },
                {
                    $or: [
                        { title: { $regex: search, $options: "i" } }, 
                        { description: { $regex: search, $options: "i" } }
                    ]
                }
            ]
        })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
            res.status(400).json(err)
        })
    } else if (animals !== '') {
        await articleCollection.find({
            animalsName: animals,
        })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
            res.status(400).json(err)
        })
    } else {
        await articleCollection.find({
            $or: [
                { title: { $regex: search, $options: "i" } }, 
                { description: { $regex: search, $options: "i" } }
            ]
        })
            .then(response => {
                res.status(200).json(response)
            })
            .catch(err => {
            res.status(400).json(err)
        })
    }
})

module.exports = router
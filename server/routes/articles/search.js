const express = require('express');
const router = express.Router();

const { articleCollection } = require("../../mongo");

router.post("/article/search", async (req, res) => {
    
    const {
        animals,
        search
    } = req.body;

    let query = null;

    if (animals !== '' && search !== '') {
        query = {$and: [
            { animalsName: animals },
            {
                $or: [
                    { title: { $regex: search, $options: "i" } }, 
                    { description: { $regex: search, $options: "i" } }
                ]
            }
        ]}
    } else if (animals !== '') {
        query = { animalsName: animals }
    } else {
        query = { $or: [
            { title: { $regex: search, $options: "i" } }, 
            { description: { $regex: search, $options: "i" } }
        ]}
    }

    await articleCollection.find(query)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
        res.status(400).json(err)
    })
})


module.exports = router
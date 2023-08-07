const express = require('express');
const router = express.Router();

const { appCollection } = require("../../mongo");


router.get('/get_shipping', async (req, res) => {

    await appCollection
    .findOne()
    .then(response => {
        res.status(200).json(response.shipping)
    })
    .catch(error => {
        console.log(error);
    }) 
    
});

module.exports = router
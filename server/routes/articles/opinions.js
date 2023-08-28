const express = require('express');
const router = express.Router();
const storage = require('../../middleware/storage')
const mongoose = require('mongoose')

const { articleCollection } = require("../../mongo");

router.post("/AddOpinions/:id", async (req, res) => {

    const { id } = req.params;
    const { opinions } = req.body;

    
    try {
        const article = await articleCollection.findById(id);
        
        if (!article.opinions) {
            article.opinions = [];
        }
        
        const userEmail = req.session.user.email;
        
        let userEmailSplit = userEmail.split('@');
        let pseudo = userEmailSplit[0];

        let completeOpinions = `${pseudo} : ${opinions}`;
        
        article.opinions.push(completeOpinions);

        await article.save();
    } catch (e) {
        console.log(e);
        res.json("fail");
    }
});

module.exports = router
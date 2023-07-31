const express = require('express');
const router = express.Router();

const { googleCollection } = require("../../mongo");

let user = null

router.post('/createGoogle', async (req, res) => {

    const {
        email,
    } = await req.body;

    const data = {
        email: email
    }

    await userExists(email)

    if (user) {
        
        req.session.user = { id: user._id, email: user.email, admin: user.admin, auth: 'google' }
        res.status(200).json("success")
    } else {

        await googleCollection
        .create(data)
        .then(response => {
            req.session.user = { id: response._id, email: response.email, admin: response.admin, auth: 'google' }
            res.status(200).json("success")
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
})

async function userExists(email) {

    await googleCollection
    .findOne({ 
        email: email, 
    })
    .then(response => {

        response ? user = response : user = null
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = router
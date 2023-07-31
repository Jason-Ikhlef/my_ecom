const express = require('express');
const router = express.Router();

const { facebookCollection } = require("../../mongo");

let user = null

router.post('/createFacebook', async (req, res) => {

    const {
        email,
    } = await req.body;

    const data = {
        email: email
    }

    await userExists(email)

    if (user) {
        req.session.user = { id: user._id, email: user.email, admin : user.admin, auth: 'facebook' }
        res.status(200).json("success")
    } else {
        await facebookCollection
        .create(data)
        .then(response => {
            req.session.user = { id: response._id, email: response.email, admin : response.admin, auth: 'facebook' }
            res.status(200).json("success")
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
})

async function userExists(email) {

    await facebookCollection
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
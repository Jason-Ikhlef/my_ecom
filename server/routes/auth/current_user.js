const express = require('express');
const router = express.Router();

router.get('/current_user', (req, res) => {

    if (!req.session.user) {

        res.status(400).json('fail');
    }
    
    res.status(200).json(req.session.user);
});

module.exports = router
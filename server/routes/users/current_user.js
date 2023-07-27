const express = require('express');
const router = express.Router();

router.get('/current_user', (req, res) => {

    if (!req.session.user) {

        return false;
    }
    
    console.log('ouidsugbdjfgndfg');
    res.json(req.session.user);
});

module.exports = router
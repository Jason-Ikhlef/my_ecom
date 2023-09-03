const express = require('express');
const router = express.Router();

router.get('/logout',  (req, res) => {

    if (req.session.user) {

      req.session.destroy();
      res.status(200).json({message: 'Logout with success !'});

    } else {

      return false;
    }
});

module.exports = router
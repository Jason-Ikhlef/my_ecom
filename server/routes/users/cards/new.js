const express = require("express");
const router = express.Router();

const {
  userCollection,
  googleCollection,
  facebookCollection,
} = require("../../../mongo");

router.post("/newCard", async (req, res) => {
  const userId = req.session.user.id;
  const auth = req.session.user.auth;

  const form = req.body.form

  switch (auth) {
    case "petheaven": {
      collection = userCollection;
      break;
    }
    case "google": {
      collection = googleCollection;
      break;
    }
    case "facebook": {
      collection = facebookCollection;
      break;
    }
  }

  await collection
    .findById(userId)
    .then(user => {

        user.data.cards.push(form)
        user.markModified('data');
        user.save()

        req.session.user.data.cards = user.data.cards
        res.status(200).json(user.data.cards)
    })
    .catch(err => {
        console.error(err)
        res.status(400).json(err)
    })
});

module.exports = router
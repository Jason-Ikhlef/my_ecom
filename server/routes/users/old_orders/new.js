const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const {
  userCollection,
  googleCollection,
  facebookCollection,
} = require("../../../mongo");

const states = ["En vérification", "Verifiée", "Expediée", "Livrée"];

let currentIndex = 0;

router.post("/newOrder", async (req, res) => {
  const userId = req.session.user.id;
  const auth = req.session.user.auth;
  const ObjectId = mongoose.Types.ObjectId;

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

  const { cart, totalPrice, address, PaymentForm } = req.body;

  await collection
    .findById(userId)
    .then((user) => {
      user.old_orders.push({
        cart,
        address,
        PaymentForm,
        totalPrice,
        date: new Date(),
        _id: new ObjectId(),
        state: states[currentIndex],
      });
      user.cart = [];
      user.markModified("cart");
      user.markModified("old_orders");
      user.save();
      req.session.user.cart = user.cart;
      req.session.user.old_orders = user.old_orders;
      res.status(200).json(user.old_orders);
      setState(userId, collection, req)
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

async function setState(userId, collection, req) {
  const timer = setTimeout(async () => {
    if (currentIndex < states.length - 1) {
      currentIndex = currentIndex + 1;
      const user = await collection.findById(userId);
      if (user && currentIndex < states.length) {
        user.old_orders[user.old_orders.length - 1].state = states[currentIndex];
        await user.markModified("old_orders");
        await user.save();
        console.log(user.old_orders);
        req.session.user.old_orders = user.old_orders;
        req.session.save()
        if (currentIndex < 3) setState(userId, collection, req)
        else currentIndex = 0
      }
    }
  }, 3000);

  return () => clearTimeout(timer);
}

module.exports = router;

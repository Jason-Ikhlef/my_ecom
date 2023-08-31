const express = require("express");
const router = express.Router();

const {
  userCollection,
  googleCollection,
  facebookCollection,
} = require("../../mongo");

router.get("/users", async (req, res) => {
  try {
    const obj = await userCollection.find({});
    const obj2 = await googleCollection.find({});
    const obj3 = await facebookCollection.find({});

    function mergeSets(targetSet, sourceSet) {
      for (const sourceObj of sourceSet) {
        const matchingObjIndex = targetSet.findIndex(
          (targetObj) => targetObj.email === sourceObj.email
        );

        if (matchingObjIndex !== -1) {
          Object.assign(targetSet[matchingObjIndex], sourceObj);
        } else {
          targetSet.push(sourceObj);
        }
      }
    }

    mergeSets(obj, obj2);
    mergeSets(obj, obj3);
    res.json(obj);
  } catch (e) {
    // voir pour envoyer des messages plus clairs en fonction des erreurs
    console.log(e);
    res.json("fail");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const EasyPostClient = require("@easypost/api");

router.post("/getShippingCost", async (req, res) => {
  const weight = req.body.weight;

  if (weight > 0) {
    const finalData = [];
    const client = new EasyPostClient(
      "EZAKab5080de21b44c8280b345ec2996206cQgZHinVoayxWpAI9dybv6A"
    );

    const shipment = await client.Shipment.create({
      from_address: {
        street1: "417 MONTGOMERY ST",
        street2: "FLOOR 5",
        city: "SAN FRANCISCO",
        state: "CA",
        zip: "94104",
        country: "US",
        company: "EasyPost",
        phone: "415-123-4567",
      },
      to_address: {
        name: "Dr. Steve Brule",
        street1: "179 N Harbor Dr",
        city: "Redondo Beach",
        zip: "90277",
        country: "US",
        phone: "4155559999",
      },
      parcel: {
        weight: weight,
      },
    });

    shipment.rates.map((item, index) => {
      if (
        (finalData.length < 2 && item.service === "Priority") ||
        item.service === "First"
      ) {
        finalData.push(item);
      }
    });

    res.status(200).json(finalData);
  }
});

module.exports = router;

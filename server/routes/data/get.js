const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path');
const { format } = require("@fast-csv/format");

let date = new Date
date = date.toLocaleDateString("fr").replaceAll("/", "-");
const fileName = `general_user_${date}.csv`;
const {
  userCollection,
  googleCollection,
  facebookCollection,
} = require("../../mongo");

router.get("/get_csv", async (req, res) => {

  const csvFile = fs.createWriteStream(fileName);

  console.log("call");
  //   function extractAddresses(addresses) {
  //     return addresses.map(
  //       (addr) => `${addr.address}, ${addr.zipcode} ${addr.city}, ${addr.country}`
  //     );
  //   }

  //   function extractCards(cards) {
  //     return cards.map((card) => `${card.name}: ${card.card}`);
  //   }

  // Commandes: item.old_orders.map((order) => JSON.stringify(order)),


  function averagePrice(old_orders) {
    let avgPrice = 0;

    old_orders.forEach(element => {
        avgPrice += element.totalPrice;
    });

    avgPrice = avgPrice / old_orders.length

    if (isNaN(avgPrice)) {
        return 0;
    } else {
        return avgPrice.toFixed(2);
    }
  }

  function totalPrice(old_orders) {
    let totalPrice = 0;

    old_orders.forEach(element => {
        totalPrice += element.totalPrice;
    })

    if (isNaN(totalPrice)) {
        return 0;
    } else {
        return totalPrice.toFixed(2);
    }
  }

  function averageObjets(old_orders) {
    let avgObj = 0;
    let count = 0;

    old_orders.forEach(order => {
        order.cart.forEach(element => {
            avgObj += element.quantity;
            count += 1;
        });
    })

    avgObj = avgObj / count;
    
    if (isNaN(avgObj)) {
        return 0;
    } else {
        return avgObj.toFixed(2);
    }
  } 

  function totalObjects (old_orders) {
    let count = 0;

    old_orders.forEach(order => {
        order.cart.forEach(element => {
            count += 1;
        })
    })

    return count;
  }

  function waitingCmd (old_orders) {
    let count = 0;

    old_orders.forEach(element => {
        if (element.state !== "Livrée") {
            count += 1;
        }
    }) 

    return count;
  }

  function subType(subscription) {

    if (subscription.month === true) {
        return "Mensuel";
    } else if (subscription.year === true) {
        return "Annuel";
    } else {
        return "Aucun";
    }
  }

  function jsonToCsv(items) {
    const csvRows = [];
    
    for (const item of items) {

        const wtgCmd = waitingCmd(item.old_orders);

      const csvRow = {
        Email: item.email,
        Adresses_enregistrées: item.data.addresses.length,
        Cartes_enregistrées: item.data.cards.length,
        Abonnement: subType(item.subscribed),
        Admin: item.admin ? "Admin" : "Client",
        '-':'',
        Commandes: item.old_orders.length,
        Cmd_attentes: wtgCmd,
        Cmd_livrées: item.old_orders.length - wtgCmd,
        Objets_panier: item.cart.length,
        '-':'',
        Prix_moyen_commande: averagePrice(item.old_orders),
        Argent_investi: totalPrice(item.old_orders),
        Nb_objet_moyen: averageObjets(item.old_orders),
        Nb_objet_total: totalObjects(item.old_orders)
      };

      csvRows.push(csvRow);
    }

    return csvRows;
  }

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

  const csvRows = jsonToCsv(obj);

  const customHeaders = [
    "Email",
    "Adresses_enregistrées",
    "Cartes_enregistrées",
    "Abonnement",
    "Admin",
    "",
    "Commandes",
    "Cmd_attentes",
    "Cmd_livrées",
    "Objets_panier",
    "",
    "Prix_moyen_commande",
    "Argent_investi",
    "Nb_objet_moyen",
    "Nb_objet_total",
  ];

  const csvStream = format({ headers: customHeaders });
  csvStream.pipe(csvFile);

  for (const row of csvRows) {
    csvStream.write(row);
  }

  csvStream.end();

  csvFile.on("finish", () => {

    const filePath = path.join(__dirname, `../../${fileName}`);

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
    res.status(200).download(filePath, fileName, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Une erreur s'est produite lors du téléchargement.");
      }

      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Erreur lors de la suppression du fichier :", unlinkErr);
        }
      });
    });
  });

  csvFile.on("error", (err) => {
    console.error(err);
    res.status(500).send("Une erreur s'est produite lors de la création du fichier");
  });
});

module.exports = router;
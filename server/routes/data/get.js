const express = require("express");
const router = express.Router();
const fs = require("fs");

const {
  userCollection,
  googleCollection,
  facebookCollection,
} = require("../../mongo");

router.get("/get_user_data", async (req, res) => {
  
  let date = new Date
  date = date.toLocaleDateString("fr").replaceAll("/", "-");
  const fileName = `general_user_${date}.csv`;

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
        Commandes: item.old_orders.length,
        Cmd_attentes: wtgCmd,
        Cmd_livrées: item.old_orders.length - wtgCmd,
        Objets_panier: item.cart.length,
        Prix_moyen_commande: averagePrice(item.old_orders),
        Argent_investi: totalPrice(item.old_orders),
        Nb_objet_moyen: averageObjets(item.old_orders),
        Nb_objet_total: totalObjects(item.old_orders),
        Utilisateurs_classiques: totalUser,
        Utilisateurs_google: totalGoogleUser,
        Utilisateurs_facebook: totalFbUser,
      };

      csvRows.push(csvRow);
    }

    return csvRows;
  }

  const obj = await userCollection.find({});
  const obj2 = await googleCollection.find({});
  const obj3 = await facebookCollection.find({});

  const totalUser = obj.length;
  const totalGoogleUser = obj2.length;
  const totalFbUser = obj3.length;

  console.log(totalUser);
  console.log(totalGoogleUser);
  console.log(totalFbUser);

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

  const data = jsonToCsv(obj);

  const header = Object.keys(data[0]).join(",");
  let values = "";
  let count = 0;

  data.forEach((element) => {
      values +=
        element.Email +
        "," +
        element.Adresses_enregistrées +
        "," +
        element.Cartes_enregistrées +
        "," +
        element.Abonnement +
        "," +
        element.Admin +
        "," +
        element.Commandes +
        "," +
        element.Cmd_attentes +
        "," +
        element.Cmd_livrées +
        "," +
        element.Objets_panier +
        "," +
        element.Prix_moyen_commande +
        "," +
        element.Argent_investi +
        "," +
        element.Nb_objet_moyen +
        "," +
        element.Nb_objet_total +
        "," +
        (count === 0 ? element.Utilisateurs_classiques : "") +
        "," +
        (count === 0 ? element.Utilisateurs_google : "") +
        "," +
        (count === 0 ? element.Utilisateurs_facebook : "") +
        "\n";

        count++;
  });
  
  const content = `${header}\n${values}`;

  fs.writeFile(fileName, content, "utf-8", (err) =>  {
    if (err) {
      console.error(err);
      res.status(500).send("Une erreur s'est produuite lors de la création du fichier CSV.");
    } else {
      res.status(200).download(fileName, fileName, (downloadErr) => {
        if (downloadErr) {
          console.error(downloadErr);
          res.status(500).send("Une erreur s'est produite lors du téléchargement.");
        } else {
          fs.unlink(fileName, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Erreur lors de la suppression du fichier :", unlinkErr)
            }
          })
        }
      })
    }
  })
});

module.exports = router;
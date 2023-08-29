const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { format } = require("@fast-csv/format");

const {
  userCollection,
  googleCollection,
  facebookCollection,
} = require("../../mongo");

router.get("/get_user_data/:id", async (req, res) => {
  const userId = req.params.id;

  function averagePrice(old_orders) {
    let avgPrice = 0;

    old_orders.forEach((element) => {
      avgPrice += element.totalPrice;
    });

    avgPrice = avgPrice / old_orders.length;

    if (isNaN(avgPrice)) {
      return 0;
    } else {
      return avgPrice.toFixed(2);
    }
  }

  function totalPrice(old_orders) {
    let totalPrice = 0;

    old_orders.forEach((element) => {
      totalPrice += element.totalPrice;
    });

    if (isNaN(totalPrice)) {
      return 0;
    } else {
      return totalPrice.toFixed(2);
    }
  }

  function averageObjets(old_orders) {
    let avgObj = 0;
    let count = 0;

    old_orders.forEach((order) => {
      order.cart.forEach((element) => {
        avgObj += element.quantity;
        count += 1;
      });
    });

    avgObj = avgObj / count;

    if (isNaN(avgObj)) {
      return 0;
    } else {
      return avgObj.toFixed(2);
    }
  }

  function totalObjects(old_orders) {
    let count = 0;

    old_orders.forEach((order) => {
      order.cart.forEach((element) => {
        count += 1;
      });
    });

    return count;
  }

  function waitingCmd(old_orders) {
    let count = 0;

    old_orders.forEach((element) => {
      if (element.state !== "Livrée") {
        count += 1;
      }
    });

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

  function articleInfo(old_order, target) {
    const items = old_order.cart.map((element) => ({
      name: element.name,
      price: element.price,
      quantity: element.quantity,
      weight: element.weight,
    }));

    let data = "";
    items.forEach((item) => {
      data += item[target] + "," + "\n";
    });

    return data.slice(0, -1);
  }

  function totalCmdWeight(old_order) {
    let totalWeight = 0;

    old_order.cart.forEach((element) => {
      totalWeight += element.weight * element.quantity;
    });

    return totalWeight;
  }

  function jsonToCsv(item) {
    const wtgCmd = waitingCmd(item.old_orders);

    const data = {
      Email: item.email,
      Admin: item.admin ? "Admin" : "Client",
      Abonnement: subType(item.subscribed),
      Commandes: item.old_orders.length,
      Adresses_enregistrées: item.data.addresses.length,
      Objets_panier: item.cart.length,
      Prix_moyen_commande: averagePrice(item.old_orders),
      Argent_investi: totalPrice(item.old_orders),
      Nb_objet_moyen: averageObjets(item.old_orders),
      Nb_objet_total: totalObjects(item.old_orders),
      Cmd_livrées: item.old_orders.length - wtgCmd,
      Cmd_attentes: wtgCmd,
    };

    return data;
  }

  function jsonToCsvCommandes(old_orders) {
    let data = [];

    for (const old_order of old_orders) {
      const date = old_order.date.toLocaleDateString("fr");
      const articles = articleInfo(old_order, "name").split("\n");
      const prices = articleInfo(old_order, "price").split("\n");
      const quantity = articleInfo(old_order, "quantity").split("\n");
      const weight = articleInfo(old_order, "weight").split("\n");

      for (let i = 0; i < articles.length; i++) {
        const row = {
          id: i === 0 ? old_order._id.toString() : "",
          Date: i === 0 ? date : "",
          Nom_article: articles[i],
          Prix: prices[i],
          Quantité: quantity[i],
          Poids: weight[i],
          Prix_commande: i === 0 ? old_order.totalPrice.toFixed(2) : "",
          Poids_total: i === 0 ? totalCmdWeight(old_order) : "",
          Etat_commande: i === 0 ? old_order.state : "",
        };
        data.push(row);
      }
    }

    return data;
  }

  function jsonToCsvAddresses(addresses) {
    let data = [];

    for (const address of addresses) {
      const row = {
        Adresse: address.address,
        Ville: address.city,
        Code_postale: address.zipcode,
        Pays: address.country,
      };

      data.push(row);
    }
    return data;
  }

  function jsonToCsvCart(cart) {
    let data = [];

    for (const item of cart) {
      const row = {
        id: item.articleId,
        Nom_article: item.name,
        Prix: item.price,
        Quantité: item.quantity,
        Poids: item.weight,
      };

      data.push(row);
    }
    return data;
  }

  let user = null;

  user = await userCollection.findOne({ _id: userId });

  if (!user) {
    user = await googleCollection.findOne({ _id: userId });
  }

  if (!user) {
    user = await facebookCollection.findOne({ _id: userId });
  }

  if (!user) {
    res.status(500).send("Utilisateur introuvable");
    return;
  }

  const generalInfos = jsonToCsv(user);
  const cmdInfos = jsonToCsvCommandes(user.old_orders);
  const addressesInfos = jsonToCsvAddresses(user.data.addresses);
  const cartInfos = jsonToCsvCart(user.cart);

  const generalCsvHeaders = Object.keys(generalInfos).join(",");
  const generalCsvValues = Object.values(generalInfos).join(",");

  let cmdHeaders,addressesCsvHeaders, cartHeader = null;
  let cmdValues, addressesValues, cartValues = "";

  combinedCsvContent = `${generalCsvHeaders}\n${generalCsvValues}`;

  if (cmdInfos.length > 0) {
    cmdHeaders = Object.keys(cmdInfos[0]).join(",");

    cmdInfos.forEach((cmdInfo) => {
      const names = cmdInfo.Nom_article.split("\n");
      const prices = cmdInfo.Prix.split("\n");
      const quantity = cmdInfo.Quantité.split("\n");
      const weight = cmdInfo.Poids.split("\n");

      for (let i = 0; i < names.length; i++) {
        cmdValues +=
          (i === 0 ? cmdInfo.id : "") +
          "," +
          (i === 0 ? cmdInfo.Date : "") +
          "," +
          names[i] +
          prices[i] +
          quantity[i] +
          weight[i] +
          cmdInfo.Prix_commande +
          "," +
          cmdInfo.Poids_total +
          "," +
          cmdInfo.Etat_commande +
          "\n";
      }
    });

    combinedCsvContent += `\n\nHistorique des commandes :\n${cmdHeaders}\n${cmdValues}`;
  } else {
    combinedCsvContent += `\n\nAucune commande passées`;
  }

  if (addressesInfos.length > 0) {
    addressesCsvHeaders = Object.keys(addressesInfos[0]).join(",");

    addressesInfos.forEach((element) => {
      addressesValues +=
        element.Adresse +
        "," +
        element.Ville +
        "," +
        element.Code_postale +
        "," +
        element.Pays +
        "\n";
    });

    combinedCsvContent += `\n\nListe des adresses :\n${addressesCsvHeaders}\n${addressesValues}`;
  } else {
    combinedCsvContent += `\n\nAucune adresse enregistrée`;
  }

  if (cartInfos.length > 0) {
    cartHeader = Object.keys(cartInfos[0]).join(",");

    cartInfos.forEach((element) => {
      cartValues +=
        element.id +
        "," +
        element.Nom_article +
        "," +
        element.Prix +
        "," +
        element.Quantité +
        "," +
        element.Poids +
        "\n";
    });

    combinedCsvContent += `\n\nContenu du panier :\n${cartHeader}\n${cartValues}`;
  } else {
    combinedCsvContent += `\n\nPanier vide`;
  }

  const fileName = `user_${userId}.csv`;

  fs.writeFile(fileName, combinedCsvContent, "utf-8", (err) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send("Une erreur s'est produite lors de la création du fichier CSV.");
    } else {
      res.status(200).download(fileName, fileName, (downloadErr) => {
        if (downloadErr) {
          console.error(downloadErr);
          res
            .status(500)
            .send("Une erreur s'est produite lors du téléchargement.");
        } else {
          fs.unlink(fileName, (unlinkErr) => {
            if (unlinkErr) {
              console.error(
                "Erreur lors de la suppression du fichier :",
                unlinkErr
              );
            }
          });
        }
      });
    }
  });
});

module.exports = router;

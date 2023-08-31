const express = require("express");
const router = express.Router();
const fs = require("fs");

const {
  userCollection,
  googleCollection,
  facebookCollection,
  articleCollection,
} = require("../../mongo");

router.get("/get_general_data", async (req, res) => {
  let date = new Date();
  date = date.toLocaleDateString("fr").replaceAll("/", "-");
  const fileName = `general_infos_${date}.csv`;

  function totalOrderedQuantity(userList) {
    let totalQuantity = 0;

    userList.forEach((user) => {
      const cart = user.cart || [];
      cart.forEach((item) => {
        totalQuantity += item.quantity;
      });
    });

    return totalQuantity;
  }

  function getTotalOrders(userList) {
    let totalOrders = 0;
    let deliveredOrders = 0;
    let otherStateOrders = 0;
    let totalPriceOrders = 0;
    let totalArticle = 0;

    userList.forEach((user) => {
      totalOrders += user.old_orders.length;
      user.old_orders.forEach((order) => {
        if (order.state === "livrée") {
          deliveredOrders++;
        } else {
          otherStateOrders++;
        }
        totalPriceOrders += order.totalPrice;
        totalArticle += order.cart.length;
      });
    });

    const avgOrderPrice = (totalPriceOrders / totalOrders).toFixed(2);
    const avgArticleOrder = (totalArticle / totalOrders).toFixed(2);

    totalPriceOrders = totalPriceOrders.toFixed(2);

    return {
      totalOrders,
      deliveredOrders,
      otherStateOrders,
      totalPriceOrders,
      avgOrderPrice,
      avgArticleOrder,
    };
  }

  function totalStock(articles) {
    let totalStockCount = 0;

    articles.forEach((article) => {
      totalStockCount += article.stock;
    });

    return totalStockCount;
  }

  function totalAdmin(userList) {
    let totalAdminCount = 0;

    userList.forEach((user) => {
      if (user.admin === true) {
        totalAdminCount += 1;
      }
    });

    return totalAdminCount;
  }

  function TotalUserData(userList) {
    let totalAdresses = 0;
    let totalCards = 0;

    userList.forEach((user) => {
      totalAdresses += user.data.addresses.length;
      totalCards += user.data.cards.length;
    });

    return { totalAdresses, totalCards };
  }

  function totalSubscription(userList) {
    let totalMonthlySub = 0;
    let totalYearlySub = 0;
    let totalSubs = 0;

    userList.forEach((user) => {
      if (user.subscribed.year) {
        totalSubs += 1;
        totalMonthlySub += 1;
      } else if (user.subscribed.month) {
        totalSubs += 1;
        totalYearlySub += 1;
      }
    });

    return { totalMonthlySub, totalYearlySub, totalSubs };
  }

  function mostWishListedArticle(userList) {
    const itemsUniqueCounter = {};
    const itemsQuantityCounter = {};

    userList.forEach((user) => {
      const cart = user.cart || [];
      cart.forEach((item) => {
        const articleId = item.articleId;
        const quantity = item.quantity;

        if (articleId) {
          itemsUniqueCounter[articleId] =
            (itemsUniqueCounter[articleId] || 0) + 1;
          itemsQuantityCounter[articleId] =
            (itemsQuantityCounter[articleId] || 0) + quantity;
        }
      });
    });

    let mostOrderedByUnique = Object.entries(itemsUniqueCounter).sort(
      (a, b) => b[1] - a[1]
    )[0];

    let mostOrderedByQuantity = Object.entries(itemsQuantityCounter).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return { mostOrderedByUnique, mostOrderedByQuantity };
  }

  async function getTopCartArticle(items) {
    const { mostOrderedByUnique, mostOrderedByQuantity } =
      mostWishListedArticle(items);

    const byUniqueArticle = await articleCollection.findOne({
      _id: mostOrderedByUnique[0],
    });
    const byQuantityArticle = await articleCollection.findOne({
      _id: mostOrderedByQuantity[0],
    });

    const uniqueName = byUniqueArticle.title;
    const quantityName = byQuantityArticle.title;

    return { uniqueName, quantityName };
  }

  function getTotalCartArticle(userList) {
    let count = 0;

    userList.forEach((user) => {
      count += user.cart.length;
    });

    return count;
  }

  function getBestSeller(userList) {
    const itemsQuantityCounter = {};

    userList.forEach((user) => {
      user.old_orders.forEach((order) => {
        order.cart.forEach((item) => {
          const articleId = item.articleId;
          const quantity = item.quantity;

          if (articleId) {
            itemsQuantityCounter[articleId] =
              (itemsQuantityCounter[articleId] || 0) + quantity;
          }
        });
      });
    });

    const bestSellingItem = Object.entries(itemsQuantityCounter).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return bestSellingItem ? bestSellingItem[0] : "N/A";
  }

  async function jsonToCsv(userList) {
    const {
      totalOrders,
      deliveredOrders,
      otherStateOrders,
      totalPriceOrders,
      avgOrderPrice,
      avgArticleOrder,
    } = getTotalOrders(userList);
    const { totalAdresses, totalCards } = TotalUserData(userList);
    const { totalMonthlySub, totalYearlySub, totalSubs } =
      totalSubscription(userList);
    const { uniqueName, quantityName } = await getTopCartArticle(userList);
    const totalCartArticle = getTotalCartArticle(userList);
    let bestSellerArticle = await articleCollection.findOne({
      _id: getBestSeller(userList),
    });

    const data = {
      Total_Art_Commandes: totalOrderedQuantity(userList),
      Total_Argent_Gagne: totalPriceOrders,
      Prix_Moy_Commande: avgOrderPrice,
      Nb_Article_Moy_Commande: avgArticleOrder,
      Total_Objets_BD: totalArticles,
      Stock_Total: totalStock(articles),

      Total_Cmd: totalOrders,
      Total_Cmd_Livrees: deliveredOrders,
      Total_Cmd_Courantes: otherStateOrders,

      Nb_Utilisateurs: userList.length,
      Dont_Admins: totalAdmin(userList),
      Total_Adresses: totalAdresses,
      Total_Cartes: totalCards,
      Total_Abon_Mensuel: totalMonthlySub,
      Total_Abon_Annuel: totalYearlySub,
      Total_Abon: totalSubs,

      Total_Art_Panier: totalCartArticle,
      Art_Populaire: uniqueName,
      Art_Populaire_Qte: quantityName,
      Meilleure_Vente: bestSellerArticle.title,
    };

    return data;
  }

  const obj = await userCollection.find({});
  const obj2 = await googleCollection.find({});
  const obj3 = await facebookCollection.find({});
  const articles = await articleCollection.find({});

  const totalArticles = articles.length;

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

  const generalInfos = await jsonToCsv(obj);

  const header = Object.keys(generalInfos).join(",");
  let values = Object.values(generalInfos).join(",");
  let content = `${header}\n${values}`;

  fs.writeFile(fileName, content, "utf-8", (err) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send("Une erreur s'est produuite lors de la création du fichier CSV.");
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

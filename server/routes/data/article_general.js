const express = require("express");
const router = express.Router();
const fs = require("fs");

const {
  articleCollection,
  userCollection,
  googleCollection,
  facebookCollection,
} = require("../../mongo");

router.get("/get_article_data", async (req, res) => {
  let date = new Date();
  date = date.toLocaleDateString("fr").replaceAll("/", "-");
  const fileName = `general_article_${date}.csv`;

  function escapeCSVValue(value) {
    if (
      typeof value === "string" &&
      (value.includes(",") || value.includes('"') || value.includes("\n"))
    ) {
      return `"${value.replace(/"/g, '""')}"`;
    } else {
      return value;
    }
  }

  function mostOrderedArticle(userList) {
    const articlesUniqueOrdersCounter = {};
    const articlesQuantityCounter = {};

    userList.forEach((user) => {
      const oldOrders = user.old_orders || [];
      oldOrders.forEach((order) => {
        const cart = order.cart || [];
        cart.forEach((item) => {
          const articleId = item.articleId;
          const quantity = item.quantity;

          if (articleId) {
            articlesUniqueOrdersCounter[articleId] =
              (articlesUniqueOrdersCounter[articleId] || 0) + 1;

            articlesQuantityCounter[articleId] =
              (articlesQuantityCounter[articleId] || 0) + quantity;
          }
        });
      });
    });

    let mostOrderedByUnique = Object.entries(articlesUniqueOrdersCounter).sort(
      (a, b) => b[1] - a[1]
    )[0];

    let mostOrderedByQuantity = Object.entries(articlesQuantityCounter).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return { mostOrderedByUnique, mostOrderedByQuantity };
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

  function jsonToCsv(items) {
    const data = [];

    for (const item of items) {
      const row = {
        Nom_article: item.title,
        Description: item.description,
        Caractéristiques: item.caracteristics,
        Prix: item.price,
        Propriété: item.property,
        Nombre_images: item.pictures.length,
        Animal: item.animalsName,
        Categorie: item.categoriesName,
        Sous_catégorie: item.subCategoriesName,
        Stock: item.stock,
        Poids: item.weight,
        Reduction: item.reduction,
        Nouveau:
          item.isNewState === "new"
            ? "Oui"
            : item.isNewState === "forced"
            ? "Oui"
            : "Non",
        Recommandé: item.recommanded ? "Oui" : "Non",
      };

      data.push(row);
    }

    return data;
  }

  async function getTopArticle(items) {
    const { mostOrderedByUnique, mostOrderedByQuantity } =
      mostOrderedArticle(items);

    const byUniqueArticle = await articleCollection.findOne({
      _id: mostOrderedByUnique[0],
    });
    const byQuantityArticle = await articleCollection.findOne({
      _id: mostOrderedByQuantity[0],
    });

    const firstRow = jsonToCsvArticle(byUniqueArticle, mostOrderedByUnique[1]);

    const secondRow = jsonToCsvArticle(
      byQuantityArticle,
      mostOrderedByQuantity[1]
    );

    return [firstRow, secondRow];
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

    const firstRow = jsonToCsvCartArticle(byUniqueArticle, mostOrderedByUnique[1]);

    const secondRow = jsonToCsvCartArticle(byQuantityArticle,mostOrderedByQuantity[1]);

    return [firstRow, secondRow];
  }

  function jsonToCsvArticle(article, quantity) {
    const row = {
      Nom_article: article.title,
      Description: article.description,
      Caractéristiques: article.caracteristics,
      Prix: article.price,
      Propriété: article.property,
      Nombre_images: article.pictures.length,
      Animal: article.animalsName,
      Categorie: article.categoriesName,
      Sous_catégorie: article.subCategoriesName,
      Stock: article.stock,
      Poids: article.weight,
      Reduction: article.reduction,
      Nouveau:
        article.isNewState === "new"
          ? "Oui"
          : article.isNewState === "forced"
          ? "Oui"
          : "Non",
      Recommandé: article.recommanded ? "Oui" : "Non",
      Quantité_commandée: quantity,
    };

    return row;
  }

  function jsonToCsvCartArticle(article, quantity) {
    const row = {
      Nom_article: article.title,
      Description: article.description,
      Caractéristiques: article.caracteristics,
      Prix: article.price,
      Propriété: article.property,
      Nombre_images: article.pictures.length,
      Animal: article.animalsName,
      Categorie: article.categoriesName,
      Sous_catégorie: article.subCategoriesName,
      Stock: article.stock,
      Poids: article.weight,
      Reduction: article.reduction,
      Nouveau:
        article.isNewState === "new"
          ? "Oui"
          : article.isNewState === "forced"
          ? "Oui"
          : "Non",
      Recommandé: article.recommanded ? "Oui" : "Non",
      Quantité_panier: quantity,
    };

    return row;
  }

  const articles = await articleCollection.find({});

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

  const articlesInfos = jsonToCsv(articles);
  const topArticle = await getTopArticle(obj);
  const topCartArticle = await getTopCartArticle(obj);

  const header = Object.keys(articlesInfos[0]).join(",");
  const headerTopArticle = Object.keys(topArticle[0]).join(",");
  const headerTopCartArticle = Object.keys(topCartArticle[0]).join(",");
  let values, valuesTopArticleUnique = "";

  articlesInfos.forEach((element) => {
    values +=
      escapeCSVValue(element.Nom_article) +
      "," +
      escapeCSVValue(element.Description) +
      "," +
      escapeCSVValue(element.Caractéristiques) +
      "," +
      element.Prix +
      "," +
      escapeCSVValue(element.Propriété) +
      "," +
      element.Nombre_images +
      "," +
      element.Animal +
      "," +
      element.Categorie +
      "," +
      element.Sous_catégorie +
      "," +
      element.Stock +
      "," +
      element.Poids +
      "," +
      element.Reduction +
      "," +
      element.Nouveau +
      "," +
      element.Recommandé +
      "\n";
  });

  for (const property in topArticle[0]) {
    valuesTopArticleUnique += escapeCSVValue(topArticle[0][property]) + ",";
  }
  valuesTopArticleUnique += "\n";

  let valuesTopArticleQuantity = "";

  for (const property in topArticle[1]) {
    valuesTopArticleQuantity += escapeCSVValue(topArticle[1][property]) + ",";
  }
  valuesTopArticleQuantity += "\n";

  let valuesTopCartArticleUnique = "";

  for (const property in topCartArticle[0]) {
    valuesTopCartArticleUnique += escapeCSVValue(topCartArticle[0][property]) + ",";
  }
  valuesTopCartArticleUnique += "\n";

  let valuesTopCartArticleQuantity = "";

  for (const property in topCartArticle[1]) {
    valuesTopCartArticleQuantity += escapeCSVValue(topCartArticle[1][property]) + ",";
  }
  valuesTopCartArticleQuantity += "\n";

  const content = `${header}\n${values}\n\nArticle unique le plus commandé\n${headerTopArticle}\n${valuesTopArticleUnique}\n\nArticle le plus commandé par quantité\n${headerTopArticle}\n${valuesTopArticleQuantity}\nArticle unique dans le plus de panier\n${headerTopCartArticle}\n${valuesTopCartArticleUnique}\n\nArticle dans le plus de panier par quantité\n${headerTopCartArticle}\n${valuesTopCartArticleQuantity}`;

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

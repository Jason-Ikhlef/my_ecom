const express = require("express");
const router = express.Router();
const fs = require("fs");

const { articleCollection } = require("../../mongo");

router.get("/get_article_data", async (req, res) => {
  let date = new Date();
  date = date.toLocaleDateString("fr").replaceAll("/", "-");
  const fileName = `general_article_${date}.csv`;

  function escapeCSVValue(value) {

    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
      return `"${value.replace(/"/g, '""')}"`;
    } else {
      return value;
    }
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

  const obj = await articleCollection.find({});

  const data = jsonToCsv(obj);

  const header = Object.keys(data[0]).join(",");
  let values = "";
  let count = 0;

  data.forEach((element) => {
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
    count++;
  });

  const content = `${header}\n${values}`;

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

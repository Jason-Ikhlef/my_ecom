const express = require("express");
const router = express.Router();
const fs = require("fs");

const {
  animalsCollection,
  categoriesCollection,
  subCategoriesCollection,
  articleCollection,
} = require("../../mongo");

router.get("/get_categorie_data", async (req, res) => {
  let date = new Date();
  date = date.toLocaleDateString("fr").replaceAll("/", "-");
  const fileName = `general_categorie_${date}.csv`;

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

  async function getNbObjects(categorieName) {
    let count = await articleCollection.count({ animalsName: categorieName });
    return count;
  }

  function categorieInfo(animals) {
    const items = [];
    animals.categories.forEach((element) => {
      items.push(element.name);
    });

    let data = "";

    items.forEach((element) => {
      data += element + "," + "\n";
    });

    return data.slice(0, -1);
  }

  async function jsonToCsv(items) {
    const data = [];

    for (const item of items) {
      const categoriesName = categorieInfo(item).split("\n");

      for (let i = 0; i < categoriesName.length; i++) {
        const row = {
          Nom: i === 0 ? item.name : "",
          Nb_categories: i === 0 ? item.categories.length : "",
          Nom_categorie: categoriesName[i],
          Nb_objets: i === 0 ? await getNbObjects(item.name) : "",
        };
        data.push(row);
      }
    }
    return data;
  }

  const animals = await animalsCollection.find({});

  const animalsInfos = await jsonToCsv(animals);

  const header = Object.keys(animalsInfos[0]).join(",");
  let values = "";

  animalsInfos.forEach((animals) => {
    const names = animals.Nom_categorie.split("\n");

    for (let i = 0; i < names.length; i++) {
      values +=
        (i === 0 ? animals.Nom : "") +
        "," +
        (i === 0 ? animals.Nb_categories : "") +
        "," +
        names[i] +
        (i === 0 ? animals.Nb_objets : "") +
        "\n";
    }
  });

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

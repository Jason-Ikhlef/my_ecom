const cors = require('cors');
const express = require('express');

const {
    userCollection,
    articleCollection,
} = require("./mongo");

const PORT = process.env.PORT || 8000;

const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// jason mongodb+srv://root:root@petheaven.ygomfkk.mongodb.net/petHeaven
// marie mongodb+srv://mrbn2212:Ma22Rie12@pool.zuhpca4.mongodb.net/petHeaven

mongoose.connect("mongodb+srv://root:root@petheaven.ygomfkk.mongodb.net/petHeaven", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connecté avec succès");
})
.catch((err) => {
    console.error("Erreur lors de la connexion à MongoDB :", err);
});

app.listen(PORT, () => {
    console.log("Utilisation du port " + PORT);
});

app.post("/create", async (req, res) => {
    const {
        title,
        description,
        price,
        caracteristics,
        pictures
    } = req.body;

    // faut gerer les images pour le stockage

    let data = {
        title: title,
        description: description,
        price: price,
        caracteristics: caracteristics
    };

    try {
        await articleCollection.create(data);
        res.json("success");
    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }
});

app.post("/createUser", async(req, res) => {
    const {
        email,
        password
    } = req.body;

    let data = {
        email: email,
        password: password
    };

    try {
        await userCollection.create(data);
        res.json("success");
    } catch (e) {
        console.log(e);
        res.json("fail");
    }
})

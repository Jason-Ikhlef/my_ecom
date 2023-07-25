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
        name,
        pictures,
        description
    } = req.body;
});

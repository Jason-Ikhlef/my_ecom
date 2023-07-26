const cors = require('cors');
const express = require('express');
const multer = require('multer');
const path = require('path');

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

app.use('/storage', express.static(path.join(__dirname, 'storage')));

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

const uploadDir = path.join(__dirname, './storage');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = RandomName();
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  }
});

const upload = multer({ storage });

function RandomName() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 10) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
  

app.listen(PORT, () => {
    console.log("Utilisation du port " + PORT);
});

app.post("/AddArticle", upload.array('photo'), async (req, res) => {
    const {
        title,
        description,
        price,
        caracteristics,
    } = req.body;

    const picturesNames = req.files.map(file => file.filename);
        
    let data = {
        title: title,
        description: description,
        price: price,
        caracteristics: caracteristics,
        pictures: picturesNames
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

app.get("/articles", async (req, res) => {
    try {
        const articles= await articleCollection.find({});
        res.json(articles);
    } catch (e) {
        // voir pour envoyer des messages plus clairs en fonction des erreurs
        console.log(e);
        res.json("fail");
    }
});

app.get("/article/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const article = await articleCollection.findOne({
            _id: id
        });

        if (!article) {
            return res.status(404).json({
                message: "Article introuvable"
            });
        }
        res.json(article);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la récupération de l'article"
        });
    }
})

app.post("/UpdateArticle", upload.array('photo'), async (req, res) => {

    const {
        title,
        description,
        price,
        caracteristics,
        id
    } = req.body;

    const picturesNames = req.files.map(file => file.filename);

    let data = {
        title: title,
        description: description,
        price: price,
        caracteristics: caracteristics,
        pictures: picturesNames
    };

    try {
        await articleCollection.updateOne({
            _id: id
        }, 
        {
            $set: data
        });

        res.json("success");
    } catch (e) {
        
        console.log(e);
        res.json("fail");
    }
});

app.post("/delete", async (req, res) => {
    let idArt = req.params.id;

    try {
        await articleCollection.deleteOne({_id: idArt});
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

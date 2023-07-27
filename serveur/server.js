const cors = require('cors');
const express = require('express');
const path = require('path');
const session = require('express-session')

const PORT = process.env.PORT || 8000;

const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'my secret',
    cookie: { maxAge: 3600000 * 4 },
    saveUninitialized: true,
    resave: false,
}));

app.use(cors({
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: 'Content-Type, Authorization',
    methods: "GET, POST, OPTIONS, PUT, DELETE",
    origin: ["http://localhost:3000"]
}));


app.use('/storage', express.static(path.join(__dirname, 'storage')));


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

// ARTICLES

const Articles = require('./routes/articles/index');
app.use('/', Articles);

const AddArticle = require('./routes/articles/new');
app.use('/', AddArticle);

const ShowArticles = require('./routes/articles/show');
app.use('/', ShowArticles);

const UpdateArticles = require('./routes/articles/update');
app.use('/', UpdateArticles);

const DeleteArticles = require('./routes/articles/delete');
app.use('/', DeleteArticles);

// USERS

const AddUser = require('./routes/users/new');
app.use('/', AddUser);

app.listen(PORT, () => {
    console.log("Utilisation du port " + PORT);
});
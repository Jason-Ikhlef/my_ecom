const cors = require('cors');
const express = require('express');
const path = require('path');
const session = require('express-session')
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8000;

const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'my secret',
    cookie: { maxAge: 3600000 * 4 },
    saveUninitialized: true,
    resave: false,
    credentials: true,
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

const ShowArticle = require('./routes/articles/show');
app.use('/', ShowArticle);

const UpdateArticle = require('./routes/articles/update');
app.use('/', UpdateArticle);

const DeleteArticle = require('./routes/articles/delete');
app.use('/', DeleteArticle);

const SearchArticle = require('./routes/articles/search');
app.use('/', SearchArticle);

// USERS

const Users = require('./routes/users/index');
app.use('/', Users);

const AddUser = require('./routes/users/new');
app.use('/', AddUser);

const ShowUser = require('./routes/users/show');
app.use('/', ShowUser);

const UpdateUser = require('./routes/users/update');
app.use('/', UpdateUser);

const DeleteUser = require('./routes/users/delete');
app.use('/', DeleteUser);

// CATEGORIES

const NewCategory = require('./routes/animals/new');
app.use('/', NewCategory);

// AUTH

const CurrentUser = require('./routes/auth/current_user');
app.use('/', CurrentUser);

const LogIn = require('./routes/auth/login');
app.use('/', LogIn);

const LogOut = require('./routes/auth/logout');
app.use('/', LogOut);

app.listen(PORT, () => {
    console.log("Utilisation du port " + PORT);
});
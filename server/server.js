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

const SliderArticles = require('./routes/articles/slider');
app.use('/', SliderArticles)

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

const Promotion = require('./routes/articles/promotion');
app.use('/', Promotion)

const CreatePromotion = require('./routes/articles/createPromotion');
app.use('/', CreatePromotion);

// USERS

const Users = require('./routes/users/index');
app.use('/', Users);

const Subscribe = require('./routes/users/subscribe');
app.use('/', Subscribe);

const AddUser = require('./routes/users/new');
app.use('/', AddUser);

const ShowUser = require('./routes/users/show');
app.use('/', ShowUser);

const UpdateUser = require('./routes/users/update');
app.use('/', UpdateUser);

const DeleteUser = require('./routes/users/delete');
app.use('/', DeleteUser);

// CARTS

const AddCart = require('./routes/users/cart/new');
app.use('/', AddCart);

const deleteFromCart = require('./routes/users/cart/delete');
app.use('/', deleteFromCart);

const clearCart = require('./routes/users/cart/clear');
app.use('/', clearCart);

// ORDERS

const newOrder = require('./routes/users/old_orders/new');
app.use('/', newOrder);

// ADDRESSES

const NewAddress = require('./routes/users/addresses/new');
app.use('/', NewAddress);

const UpdateAddress = require('./routes/users/addresses/update');
app.use('/', UpdateAddress);

// CARDS

const NewCard = require('./routes/users/cards/new');
app.use('/', NewCard);

const UpdateCard = require('./routes/users/cards/update');
app.use('/', UpdateCard)

// CATEGORIES

const NewCategory = require('./routes/animals/new');
app.use('/', NewCategory);

const Categorie = require('./routes/animals/index');
app.use('/', Categorie);

const DeleteCategory = require('./routes/animals/delete');
app.use('/', DeleteCategory);

const ShowCategory = require('./routes/animals/show');
app.use('/', ShowCategory);

// AUTH

const CurrentUser = require('./routes/auth/current_user');
app.use('/', CurrentUser);

const LogIn = require('./routes/auth/login');
app.use('/', LogIn);

const LogOut = require('./routes/auth/logout');
app.use('/', LogOut);

const AddGoogle = require('./routes/auth/google');
app.use('/', AddGoogle);

const AddFacebook = require('./routes/auth/facebook');
app.use('/', AddFacebook);

// EASYPOST

const ShippingCost = require('./routes/easypost/get');
app.use('/', ShippingCost);

const GetShipping = require('./routes/easypost/shipping');
app.use('/', GetShipping);

const setShipping = require('./routes/easypost/newShipping');
app.use('/', setShipping);

// DATA
const getGeneralUser = require('./routes/data/get');
app.use('/', getGeneralUser);

const getUniqueUser = require('./routes/data/show');
app.use('/', getUniqueUser);

// A deplacer 

const { articleCollection, appCollection } = require("./mongo");

async function updateArticle () {
    let currentDate = new Date
    currentDate.setDate(currentDate.getDate() - 3);
    const articles = await articleCollection.find({});
    
    articles.forEach(async element => {
        let articleDate = element._id.getTimestamp();
        if (currentDate > articleDate && element.isNewState === 'new') {
            await articleCollection.updateOne({
                _id: element._id
            },
            {
                $set: {new: 'old'}
            });
        }
    });
}

updateArticle();

async function salePeriod () {
    let currentDate = new Date;
    const promotion = await appCollection.findOne({});

    if (promotion.salePeriod === true && promotion.startDate < currentDate && promotion.endDate > currentDate && promotion !== 0) {

        await articleCollection.updateMany({
                $set: {reduction : promotion.promotion }
            })

    } else if ((promotion.salePeriod === true && promotion.endDate < currentDate) || promotion.promotion === 0) {

        await appCollection.updateMany({
            $set: {salePeriod: false}
        });

        await articleCollection.updateMany({
            $set: {reduction: 0}
        });
    }
}

setInterval(salePeriod, 5000);

app.listen(PORT, () => {
    console.log("Utilisation du port " + PORT);
});
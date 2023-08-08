const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Adresse email requise',
        validate: {
            validator: function (value) {
                return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'Format incorrect'
        },
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    cart: {
        type: Array,
        default: []
    },
    old_orders: {
        type: Array,
        default: []
    },
    data: {
        type: Object,
        default: {
            addresses: [],
            cards: []
        }
    },
    admin: {
        type: Boolean,
        default: false
    },
    subscribed: {
        type: Object,
        default: { 
            month: false,
            year: false
        }
    },
});

const googleSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Adresse email requise',
        validate: {
            validator: function (value) {
                return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'Format incorrect'
        },
    },
    cart: {
        type: Array,
        default: []
    },
    old_orders: {
        type: Array,
        default: []
    },
    data: {
        type: Object,
        default: {
            addresses: [],
            cards: []
        }
    },
    admin: {
        type: Boolean,
        default: false
    },
    subscribed: {
        type: Object,
        default: { 
            month: false,
            year: false
        }
    },
});

const facebookSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Adresse email requise',
        validate: {
            validator: function (value) {
                return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: 'Format incorrect'
        },
    },
    cart: {
        type: Array,
        default: []
    },
    old_orders: {
        type: Array,
        default: []
    },
    data: {
        type: Object,
        default: {
            addresses: [],
            cards: []
        }
    },
    admin: {
        type: Boolean,
        default: false
    },
    subscribed: {
        type: Object,
        default: { 
            month: false,
            year: false
        }
    },
});

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    caracteristics: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    pictures: {
        type: Array,
        default: [],
        required: true
    },
    animals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'animals',
        required: true
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    subCategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategories',
        required: true
    },
    animalsName: {
        type: String,
        required: true
    },
    categoriesName: {
        type: String,
        required: true
    },    
    subCategoriesName: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    recommanded: {
        type: Boolean,
        default: false,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    property: {
        type: String,
        required: true
    },
    reduction: {
        type: Number,
        default: 0
    }
})

const mainArticleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article',
        required: true
    }],
})

const subCategoriesSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    subCategories: [subCategoriesSchema]
});

const animalsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    categories: [categoriesSchema]
});

const appSchema = new mongoose.Schema({
    shipping: {
        type: Number,
        default : 0
    },
});

const userCollection = mongoose.model("user", userSchema)
const googleCollection = mongoose.model("google", googleSchema)
const facebookCollection = mongoose.model("facebook" , facebookSchema)
const mainArticleCollection = mongoose.model("mainArticle", mainArticleSchema)
const articleCollection = mongoose.model("article", articleSchema)
const animalsCollection = mongoose.model("animals", animalsSchema)
const categoriesCollection = mongoose.model("categories", categoriesSchema)
const subCategoriesCollection = mongoose.model("subCategories", subCategoriesSchema)
const appCollection = mongoose.model("app", appSchema)

const collection = {
    userCollection,
    googleCollection,
    facebookCollection,
    articleCollection,
    animalsCollection,
    categoriesCollection,
    subCategoriesCollection,
    mainArticleCollection,
    appCollection
}

module.exports = collection
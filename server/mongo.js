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
    admin: {
        type: Boolean,
        default: false
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
        ref: 'categories'
    },
    subCategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subCategories'
    stock: {
        type: Number,
        required: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    }
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


const userCollection = mongoose.model("user", userSchema)
const articleCollection = mongoose.model("article", articleSchema)
const animalsCollection = mongoose.model("animals", animalsSchema)
const categoriesCollection = mongoose.model("categories", categoriesSchema)
const subCategoriesCollection = mongoose.model("subCategories", subCategoriesSchema)

const collection = {
    userCollection,
    articleCollection,
    animalsCollection,
    categoriesCollection,
    subCategoriesCollection,
}

module.exports = collection
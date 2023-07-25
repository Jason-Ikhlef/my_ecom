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
    categories: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    pictures: {
        type: String,
        required: true
    }
})

const userCollection = mongoose.model("user", userSchema)
const articleCollection = mongoose.model("article", articleSchema)

const collection = {
    userCollection,
    articleCollection,
}

module.exports = collection
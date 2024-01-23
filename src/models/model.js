const mongoose = require('mongoose');

// Define a Mongoose schema for User
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
    },
    lastname: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    }
})

// Create a Mongoose model using the schema
const User = mongoose.model('User', userSchema);


// Define a Mongoose schema for your data
const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    occupation: String,
    value: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

// Create a Mongoose model using the schema
const Data = mongoose.model('Data', dataSchema);

// Define a Mongoose schema for posts
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
    // add other fields as needed
});

// Create a Mongoose model for posts
const Post = mongoose.model('Post', postSchema);

module.exports = { User, Data, Post };
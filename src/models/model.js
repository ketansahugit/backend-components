const mongoose = require('mongoose');

// Define a Mongoose schema for your data
const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    occupation: String,
    value: Number,
});

// Create a Mongoose model using the schema
const Data = mongoose.model('Data', dataSchema);

// Define a Mongoose schema for posts
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    // add other fields as needed
});

// Create a Mongoose model for posts
const Post = mongoose.model('Post', postSchema);

module.exports = { Data, Post };
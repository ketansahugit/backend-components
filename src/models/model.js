const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define a Mongoose schema for user data
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Adjust roles as needed
        default: 'user',
    },
});

// Hash the user password before saving to the database
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

// Define a Mongoose model for users
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
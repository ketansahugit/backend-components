const { Data, Post } = require('../models/model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { generateToken } = require('../middleware/authMiddleware');

// welcome message
const getWelcomeMessage = (req, res) => {
    res.status(200).json({ message: 'Welcome to your API!'});
};

// get data
const getData = async (req, res) => {
    try {
         // Use the Data model to fetch data from the database
         const data = await Data.find();
         res.status(200).header('Content-Type', 'application/json').json({ data });
    } catch (error) {
        console.error('Error fetching data', error);
        res.status(500).header('Content-Type', 'application/json').json({error: 'Internal Server Error'})
    }
};

// create data
const createData = async (req, res) => {
    // Validate input using express validator
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).header('Content-Type', 'application/json').json({ errors: errors.array() });
    }

    try {
        // Use the Data model to create data in the database
        const newData = await Data.create(req.body);
        res.status(201).json({message: 'Data Successfully created', newData});
    } catch (error) {
        console.error('Error creating data', error);
        res.status(500).json({ error: 'Internal server error'});
    }
};

// get posts
const getPosts = async (req, res) => {
    try {
        // fetch posts from the database
        const posts = await Post.find();
        res.status(200).json({ posts });
    } catch (error) {
        console.error('Error fetching posts', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// create posts
const createPost = async (req, res) => {
    // Validate input using express validator
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // create a new post in the database
        const newPost = await Post.create(req.body);
        res.status(201).json({ message: 'Post Successfully created', newPost});
    } catch (error) {
        console.error('Error creating post', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// update posts
const updatePost = async (req, res) => {
    // Implement update logic
    const postId = req.params.id;
    const { title, content } = req.body;

    try {
        // Find the post by ID in the database
            const post = await Post.findById(postId);

        // check if the post exists
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // update the post with the new data
        post.title = title;
        post.content = content;

        // save the updated post
        await post.save();

        res.status(200).json({ message: 'Post successfully updated', updatedPost: post});
    } catch (error) {
        console.error('Error updating post', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// delete posts
const deletePost = async (req, res) => {
    // Implement delete logic
    const postId = req.params.id;

    try {
        // Find the post by ID in the database
        const post = await Post.findById(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Delete the post
        await post.deleteOne();
        res.status(200).json({ message: 'Post successfully deleted', deletedPost: post})
    } catch (error) {
        console.error('Error deleting post', error);
        res.status(500).json({ error: 'Internal server error'});
    }
};

module.exports = {getWelcomeMessage, getData, createData, getPosts, createPost, updatePost, deletePost};
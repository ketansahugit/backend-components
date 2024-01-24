const { User, Data, Post} = require('../models/model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// welcome message
const getWelcomeMessage = (req, res) => {
    res.status(200).json({ message: 'Welcome to your API!'});
};

// Register 
const register = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        if (!(firstName && lastName && email && password)) {
            res.status(400).send('All fields are compulsory')
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(401).send('User already exists with this email')
        }

        const myEncPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: myEncPassword
        })

        // Generate a token for user and send it
        const token = jwt.sign(
            {id: user._id, email},
            'shhhh', // process.env.jwtsecret
            {
                expiresIn: "2h"
            }
        );
        user.token = token;
        user.password = undefined; // this here wont specifically make it undefined in the db
        
        res.status(201).json(user)

    } catch (error) {
        console.log(error)
    }
}

// Logic
const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!(email && password)) {
            res.status(400).send('send all data');
        }

        const user = await User.findOne({email})
        if (!user) { 
            res.status(400).send('User does not exist in db')
        }

        // Match the password
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                {id: user._id},
                'shhhh', // process.env.jwtsecret
                {
                    expiresIn: "2h"
                }
            );
            user.token = token;
            user.password = undefined;

            // Cookie section
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };
            res.status(200).cookie("token", token, options).json({
                success: true,
                token,
                user
            })
        }   
    } catch (error) {
        console.log(error)
    }
}


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
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
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
    if (!errors.isEmpty()) {
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


module.exports = {getWelcomeMessage, getData, createData, getPosts, createPost, updatePost, deletePost, register, login};
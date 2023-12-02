const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log('Connected to the database');
    } catch(error) {
        console.log('error connecting to the database:', error);
    }
};

module.exports = connectDB;
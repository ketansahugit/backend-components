const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/backend-component', {
        });
        console.log('Connected to the database');
    } catch(error) {
        console.log('error connecting to the database:', error);
    }
};

module.exports = connectDB;
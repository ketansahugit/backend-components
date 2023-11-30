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

module.exports = Data;
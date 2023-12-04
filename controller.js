const Data = require('./model');
const { validationResult } = require('express-validator');

const getData = async (req, res) => {
    try {
         // Use the Data model to fetch data from the database
         const data = await Data.find();
         res.status(200).json({ data });
    } catch (error) {
        console.error('Error fetching data', error);
        res.status(500).json({error: 'Internal Server Error'})
    }
};

const createData = async (req, res) => {
    
    // Validate input using express validator
    const errors = validationResult(req);
    if (!errors.isEmpty) {
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

module.exports = {getData, createData};
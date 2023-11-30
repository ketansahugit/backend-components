const express = require("express");
const routes = require("./routes");
const connectDB = require('./db');
const Model = require('./model')

const app = express();
const port = 3000;

// Middleware to parse JSON in the request body
app.use(express.json());

// Connect to the database
connectDB();

// Using the routes in the application
app.use('/', routes);


app.listen(port, () => {
    console.log(`Server is listening at localhost: ${port}`)
})
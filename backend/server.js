/* 
require → import a library
"dotenv" → library name
.config() → load environment variables 

“Load secret settings from .env file”
*/
require("dotenv").config();

/*
Import the Express library and store it in a variable called express
👉 The value returned by require() is usually an object (or function)
*/

const mongoose = require("mongoose");
const cors = require("cors");
// express is actually a function - express()
const express = require("express");

//👉 You are calling that function
//👉 It returns an object (your app)
const app = express();

// use the cors middleware to enable CORS for all routes in your Express app
app.use(cors());
// use the express.json() middleware to parse incoming JSON request bodies only for routes that expect JSON data
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose // calling the mongoose function to connect to the database
  .connect(process.env.MONGO_URI) // connect to the database using the connection string stored in the MONGO_URI environment variable
  // If the connection is successful, log a message to the console
  .then(() => console.log("Connected to MongoDB")) // try block for successful connection
  // If there is an error connecting to the database, log the error to the console
  .catch((err) => console.error("Error connecting to MongoDB:", err)); // catch block for handling connection errors

// Define a simple route for testing
app.get("/", (req, res) => {
  console.log("Backend is running"); // log a message when a GET request is received
});

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

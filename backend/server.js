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

// express is actually a function - express()
const express = require("express");

// Import Mongoose to connect and interact with MongoDB
const mongoose = require("mongoose");

// Import CORS to allow requests from a different origin (e.g., Netlify frontend)
const cors = require("cors");

//👉 You are calling that function
//👉 It returns an object (your app)
const app = express();

// -------------------- MIDDLEWARES --------------------
// use the cors middleware to enable CORS for all routes in your Express app
app.use(cors());
// use the express.json() middleware to parse incoming JSON request bodies only for routes that expect JSON data
app.use(express.json());

//----------------------------------------------------------------------------------------------------------------------
// Import the userRoutes module from the routes directory. This module contains the route definitions for user registration and login.
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes); // This line tells the Express app to use the userRoutes for any routes that start with /api. For example, if we have a route defined as /register in userRoutes, it will be accessible at /api/register in the main server. This helps to organize our routes and keep them modular by separating them into different files.
// use         ? This is a method provided by the Express app object that allows us to specify middleware or routes that should be used for certain paths. In this case, we are using it to tell the app to use the userRoutes for any routes that start with /api.
// "api"       ? This is the path prefix for the routes defined in userRoutes. It means that any route defined in userRoutes will be accessible with /api as the base path. For example, if we have a route defined as /register in userRoutes, it will be accessible at /api/register in the main server.
// userRoutes  ? This is the router object that we imported from the userRoutes.js file. It contains the route definitions for user registration and login. By using app.use("api", userRoutes), we are telling our Express app to use the routes defined in userRoutes for any requests that start with /api. This allows us to keep our route definitions organized in a separate file and easily manage them in our main server file.
//-----------------------------Example URL: http://localhost:5000/api/register
//----------------------------------------------------------------------------------------------------------------------

//     [explaination]
// http://localhost:5000/api/register  -->            []  (1) Client (Frontend) sends a POST request to the /api/register endpoint with user registration data (name, email, password).
// /api/register  -->                                 []  (2) The Express app receives the request and routes it to the appropriate controller function based on the route definitions in userRoutes.js. In this case, it will route to the register function in userController.js.
// userRoutes.js  -->                                 []  (3) The register function in userController.js is called to handle the registration logic. It will validate the input, check if the email already exists in the database, create a new user object, and save it to MongoDB using the User model.
// register function in userController.js  -->        []  (4) The User model interacts with MongoDB to save the new user data. If the registration is successful, a success response is sent back to the frontend. If there are any errors (like missing fields or email already exists), an error response is sent back to the frontend with the appropriate status code and message.
// User model to interact with MongoDB                []  (5) The User model defines the schema for the user data and provides methods to interact with the MongoDB database. It is used in the register function to create a new user and save it to the database.

// -------------------- DATABASE CONNECTION --------------------

// Connect to MongoDB using Mongoose
mongoose // calling the mongoose function to connect to the database
  .connect(process.env.MONGO_URI) // connect to the database using the connection string stored in the MONGO_URI environment variable
  // If the connection is successful, log a message to the console
  .then(() => console.log("Connected to MongoDB")) // try block for successful connection
  // If there is an error connecting to the database, log the error to the console
  .catch((err) => console.error("Error connecting to MongoDB:", err)); // catch block for handling connection errors

// -------------------- TEST ROUTE --------------------

// Define a simple route for testing
app.get("/", (req, res) => {
  res.send("Backend is running"); // send a response when a GET request is received
});

// -------------------- START SERVER --------------------

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

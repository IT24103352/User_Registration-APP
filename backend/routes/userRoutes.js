/*

Client (Frontend)
      ↓
Routes  (decide WHICH function to run)  #####
      ↓
Controller (WHAT logic to execute)
      ↓
Model (talks to database)
      ↓
MongoDB (stores data)

*/

// routes/userRoutes.js

const express = require("express"); // Import the Express library to create a router for handling user-related routes
const router = express.Router(); // Create a new router object using the Express Router. This router will be used to define routes related to user registration and login. We can then export this router and use it in our main server file to handle requests to these routes.
// Router ? A router in Express is a way to group related routes together. It allows us to define routes for specific parts of our application (like user registration and login) in a modular way. We can create multiple routers for different parts of our application and then use them in our main server file to keep our code organized and maintainable.

// FIXED: Correct file name (lowercase u)
const { register, login } = require("../Controllers/userController");
// register ? This is the name of the function we are importing from the userController.js file. It is the function that handles user registration logic when a POST request is made to /api/register.
// login ? This is the name of the function we are importing from the userController.js file. It is the function that handles user login logic when a POST request is made to /api/login.
// We are using destructuring assignment to import both the register and login functions from the userController.js file in one line. This allows us to use these functions in our routes to handle registration and login requests.

// -----------------------------Register route-----------------------------------
router.post("/register", register);
// router       ? This is the router object we created using express.Router(). We use this router to define our routes for user registration and login.
// post         ? This is the HTTP method we are using for the route. In this case, we are using POST because we want to create a new user when a registration request is made. POST requests are typically used for creating new resources on the server.
// "/register"  ? This is the path for the registration route. When a POST request is made to /api/register (assuming we use this router in our main server file with a prefix of /api), it will trigger the register function that we imported from the userController.js file to handle the registration logic.
// --------------Example URL: http://localhost:5000/register
// register     ? This is the function that will be called when a POST request is made to /api/register. It contains the logic for handling user registration, such as validating input, checking if the email already exists, creating a new user, and saving it to the database. We imported this function from the userController.js file and are now using it in our route definition to handle registration requests.

// -----------------------------Login route----------------------------------------
router.post("/login", login);

module.exports = router; // Export the router object so it can be used in other parts of the application, such as in the main server file where we will use this router to handle requests to /api/register and /api/login routes. By exporting the router, we can keep our route definitions organized in a separate file and easily import them into our main server file.

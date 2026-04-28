// userController.js

// Import the User model so we can interact with the database
const User = require("../models/User"); // Import the User model from the userModel.js file located in the models directory
// we ".." means go back to the parent directory and then go to the models directory and import the userModel.js file

// ---------------------- REGISTER CONTROLLER ----------------------
// This function runs when the user sends POST /api/register
exports.register = async (req, res) => {
  // exports ? This is how we export functions in Node.js. We are exporting the register function so it can be used in other parts of the application, such as in the routes file.
  // register ? This is the name of the function we are exporting. It can be called anything, but we choose "register" because it describes what the function does (handles user registration).
  // async ? This means that the function is asynchronous, which allows us to use await inside it to handle asynchronous operations like database queries without blocking the execution of the code.
  // (req, res) ? These are the parameters of the function. req stands for "request" and res stands for "response". They are objects that represent the HTTP request and response. We use req to access data sent from the frontend (like form data), and we use res to send back a response to the frontend (like success or error messages).

  // Extract data sent from frontend (name, email, password)
  const { name, email, password } = req.body;
  // req.body is an object that contains the data sent from the frontend in the request body. We use destructuring assignment to extract the name, email, and password fields from req.body and store them in separate variables for easier access.

  //  Backend validation for empty fields
  if (!name || !email || !password) {
    // This checks if any of the fields (name, email, or password) are empty. If any of them are missing, it means the user did not fill out all the required fields in the registration form.
    return res.status(400).json({ message: "All fields are required" });
  }
  // return ? used to stop  the execution of the function and send a response back to the frontend immediately. In this case, if any of the fields are empty, we return a 400 status code along with a JSON response containing an error message. This prevents the rest of the registration logic from running if the input is not valid.

  // res = response
  // error status codes
  //----- 400 Bad Request: This status code indicates that the server cannot process the request due to a client error, such as missing required fields or invalid data. In this case, if any of the fields (name, email, or password) are empty, we return a 400 status code along with a JSON response containing an error message.
  //------user input is not valid or complete in the backend
  //----- 500 Internal Server Error: This status code indicates that something went wrong on the server while processing the request. If there is an unexpected error during the registration process (like a database error), we catch that error and return a 500 status code along with a JSON response containing an error message.
  //------server error occurs while processing the request in the backend
  //------200 OK: This status code indicates that the request was successful and the server is returning the expected response. If the registration is successful, we return a 200 status code along with a JSON response containing a success message.
  //------request is successful and user is registered successfully in the backend

  //json - the format we use to send data between frontend and backend.

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    // await   ? This is used to wait for the result of the asynchronous operation (in this case, the database query) before moving on to the next line of code. It allows us to write asynchronous code in a more synchronous style, making it easier to read and understand. In this case, we are waiting for the result of User.findOne({ email }) to check if a user with that email already exists in the database before proceeding with the registration process.
    // findOne ? This is a Mongoose method that finds the first document in the collection that matches the specified criteria (in this case, the email).

    if (existingUser) {
      // If email already exists, return an error message
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create a new user object using the User model - if email does not exist, we create a new user object using the User model. We pass the name, email, and password to the constructor of the User model to create a new instance of the user.
    const newUser = new User({
      // This creates a new instance of the User model with the provided name, email, and password. The newUser variable now holds a Mongoose document that represents the new user we want to save to the database.
      name, // The name field is set to the value of the name variable, which we extracted from req.body earlier.
      email, // The email field is set to the value of the email variable, which we extracted from req.body earlier.
      password, // The password field is set to the value of the password variable, which we extracted from req.body earlier.
    });

    // Save the new user to MongoDB
    await newUser.save(); // This line saves the new user document to the MongoDB database. The save() method is an asynchronous operation, so we use await to wait for it to complete before moving on to the next line of code. If the save operation is successful, the new user will be stored in the database.

    // Send success response
    res.json({ message: "User registered successfully" }); // If the registration is successful, we send a JSON response back to the frontend with a success message. The status code defaults to 200 OK when using res.json() without specifying a status code, indicating that the request was successful and the user was registered successfully.
    // we can also specify the status code explicitly like this:
    // //res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    // If something goes wrong, send error message
    res.status(500).json({ message: "Server error", error });
  }
};

// ---------------------- LOGIN CONTROLLER ----------------------
// This function runs when the user sends POST /api/login
exports.login = async (req, res) => {
  // exports.login ? This is the name of the function we are exporting. It can be called anything, but we choose "login" because it describes what the function does (handles user login).
  // login ? This function will handle the login logic when a user tries to log in by sending a POST request to /api/login. It will check if the email and password provided by the user match an existing user in the database and respond accordingly.
  // async ? This means that the function is asynchronous, which allows us to use await inside it to handle asynchronous operations like database queries without blocking the execution of the code.
  // (req, res) ? These are the parameters of the function. req stands for "request" and res stands for "response". They are objects that represent the HTTP request and response. We use req to access data sent from the frontend (like form data), and we use res to send back a response to the frontend (like success or error messages).

  // Extract email and password from frontend
  const { email, password } = req.body;
  // body (html body) is the part of the HTTP request where the frontend sends data to the backend. In this case, when a user tries to log in, they will send their email and password in the request body. We use destructuring assignment to extract the email and password fields from req.body and store them in separate variables for easier access.

  // Backend validation for empty fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if a user exists with this email + password
    const user = await User.findOne({ email, password });

    if (!user) {
      // If no match found, login fails
      return res.status(400).json({
        message: "Invalid email or password , please register and try again",
      });
    }

    // If user exists, login successful
    res.json({ message: "Login successful" });
  } catch (error) {
    // If something goes wrong, send error message
    res.status(500).json({ message: "Server error", error });
  }
};

// models/User.js
// This file defines the User model using Mongoose, which will be used to interact with the MongoDB database.
const mongoose = require("mongoose");

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    // The name field is required for each user
    type: String, // The name field is of type String
    required: true, // The name field is required
  },

  email: {
    type: String, // The email field is of type String
    required: true, // The email field is required
    unique: true, // The email field must be unique
  },

  password: {
    type: String, // The password field is of type String
    required: true, // The password field is required
  },
});

// Create the User model using the UserSchema
const User = mongoose.model("User", UserSchema);

// Export the User model so it can be used in other parts of the application
module.exports = User;

// we can also export like  "module.exports = mongoose.model('User', UserSchema);"

/* 
Mongo DB is Non relational database Which is used for unstructured data.
Specially used in Facebook Instagram There are unstructured datas.
How mongo DB Store data . It will not create tables like my SQL. We can use their foreign keys and linked together.

*/

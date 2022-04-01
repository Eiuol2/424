const asyncify = require('express-asyncify')

let mongoose = require("mongoose"),
  express = require("express"),
  router = asyncify(express.Router());

let userSchema = require("../Models/User")

function generateAccessToken(username) {
  return jwt.sign({ username: username }, process.env.TOKEN_SECRET, {
    expiresIn: "800s",
  });
}

//Signup

router.route("/signup").post((req, res, next) => {
  const placeholderUser = {username: "", pwd: ""};
  const username = req.body.username;
  const userPwd = req.body.pwd;
  const userExist = userSchema.find({"username": username}); 
  if (!username && !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    if (userExist.hasNext() === true) {
      //Conflicting usernames. Assuming it's not allowed, then:
      res.status(409).send("Username already taken");
    } else {
      // generate salt to hash password
      /* Made up of random bits added to each password instance before its hashing. 
        Salts create unique passwords even in the instance of two users choosing the 
        same passwords. Salts help us mitigate hash table attacks by forcing attackers 
        to re-compute them using the salts for each user.
        More info: https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/
        */
      // Also, you can pull this salt from an env variable
      const salt = await bcrypt.genSalt(10);
      // On the database you never store the user input pwd.
      // So, let's hash it:
      const hashedPWd = await bcrypt.hash(userPwd, salt);
      // Now, call a model function to store the username and hashedPwd (a new user)
      // For demo purposes, I'm skipping the model piece, and assigning the new user to this fake obj
      placeholderUser.username = username;
      placeholderUser.pwd = hashedPWd;
        userSchema.create(placeholderUser, (error, data) => {
            if (error) {
                return next(error);
              } else {
                console.log(data);
              }
        })
      const token = generateAccessToken(username);
      res.status(201).send(token);
    }
  }
});
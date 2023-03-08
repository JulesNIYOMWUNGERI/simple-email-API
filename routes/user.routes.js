const passport = require('passport');

module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    const router = require("express").Router();
  
    // Create a new user
    router.post("/", users.create);
  
    // Retrieve all users
    router.get("/", users.findAll);

    //user login
    router.post('/login',passport.authenticate('local'),users.userLogin);
  
    app.use('/api/users', router);
};
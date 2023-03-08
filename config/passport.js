const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { validPassword } = require('../lib/passportUtils');
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;


const customFields = {
    usernameField:'email',
    passwordField:'password'
}

const verifyCallback = (username,password,done) => {

    let email = username

    var condition = email ? { email: { [Op.iLike]: `%${email}%` } } : null;
    User.findOne({ where: condition })
    .then(async(user) => {
        
        if(!user) {return done(null, false)}
        

        const isValid = validPassword(password, user.hash, user.salt);

        if(isValid) { 
            return done(null, user)
        }else {
            return done(null, false)
        }
    })
    .catch((err) => {
        done(err)
    })
}

const strategy = new localStrategy(customFields,verifyCallback)

passport.use(strategy)

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
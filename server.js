const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
const Sequelize = require("sequelize");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


const app = express();

var corsOptions = {
  origin: "http://localhost:5432"
};

app.use(cors(corsOptions));

app.use(express.json());

const sequelize = new Sequelize("passportauth", "postgres", "nmjules77", {
  dialect: "sqlite",
  storage: "./session.sqlite",
});

const myStore = new SequelizeStore({
  db: sequelize,
});

app.use(session({
  secret: 'mykey',
  resave: false,
  saveUninitialized: true,
  store: myStore,
  proxy: true,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24
  }
}));

myStore.sync();

require('./config/passport')

app.use(passport.initialize());
app.use(passport.session())

app.get('/web',(req,res)=>{

  if(req.session.viewCount){
      req.session.viewCount = req.session.viewCount + 1 
  }else{
      req.session.viewCount = 1
  }
  
  res.send(`<h1>you visited this website ${req.session.viewCount} times</h1>`)
})


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our email app." });
});

require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
});























// const express = require('express')
// const cors = require('cors')
// const session = require('express-session');
// const pg = require('pg');
// const pool = require('./db')
// const router = require('./routers/router');
// const passport = require('passport');

// const pgSession = require('connect-pg-simple')(session);



// const app = express();


// //middlewares
// app.use(cors());
// app.use(express.json());


// const sessionStore = new pgSession({
//     pool : pool,
//     tableName : 'sessions'
// })

// app.use(session({
//     secret: 'mykey',
//     resave: false,
//     saveUninitialized: true,
//     store: sessionStore,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }));


// require('./comfig/passport')

// app.use(passport.initialize());
// app.use(passport.session())



// app.use(router)


// const PORT = 5000


// app.listen(PORT,() => {
//     console.log(`Server is running on port:http://localhost:${PORT}`)
// })

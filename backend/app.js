const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const session = require('express-session');
const bodyParser = require("body-parser");
const path = require('path');
// const { sequelize } = require('./models/database')
// sequelize.sync({ alter: true });
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use(passport.initialize());
// app.use(passport.session());
app.set('views', path.join(__dirname, '../views'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'ASecret Key',
  resave: false,
  saveUninitialized: true,
  // store: 'toanappropriateplace', 
  cookie: {
      maxAge: 3 * 60 * 60 * 24
  }
})) ;
// Start the server 
app.get("/", (req, res) => {
  res.render("Home.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
app.get("/solutions", (req, res) => {
  res.render("contact.ejs");
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}/`);
});

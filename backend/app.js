const express = require('express');
const dotenv = require("dotenv");
dotenv.config();
const session = require('express-session');
const bodyParser = require("body-parser");
const path = require('path');
// const { sequelize } = require('./models/database')
// sequelize.sync({ alter: true });
const app = express();
// app.set("view engine", "ejs");
app.use(express.static("../public"));
// app.use(passport.initialize());
// app.use(passport.session());
const SibApiV3Sdk = require('sib-api-v3-sdk');
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



const defaultClient = SibApiV3Sdk.ApiClient.instance;

var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'new_home.html'));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'aboutus.html'));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'contact.html'));
});
app.get("/product1", (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'product1.html'));
});
app.get("/product2", (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'product2.html'));
});
app.get("/product3", (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'product3.html'));
});
app.post("/send-mail", async (req, res) => {
  // Extract form data
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const message = req.body.message;

  // Extract checkbox values (interests)
  const interestsArray = req.body.interests;
  let interests = "Interest: ";
  if (Array.isArray(interestsArray)) {
      interests += interestsArray.join(", ");
  } else if (interestsArray) {
      interests += interestsArray; // if only one checkbox is checked
  } else {
      interests += "None"; // if no checkbox is checked
  }

  // Construct the email content
  const emailContent = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n${interests}\nMessage: ${message}`;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sender = {
      email: "shivqe74158@gmail.com",
      name: "Revin",
  };
  const receiver = [
      {
          email: "shivanandgarg1234@gmail.com", // will be replaced by official Satcard email
      },
  ];

  try {
      await apiInstance.sendTransacEmail({
          sender,
          to: receiver,
          subject: "Revin Krishi Notification",
          textContent: emailContent,
      });
      console.log("Email sent successfully");
      res.redirect("/contact");
  } catch (err) {
      console.error("Error sending email:", err);
      res.status(500).send("An error occurred while sending the email.");
  }
});

const port = process.env.PORT || 3000 ;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

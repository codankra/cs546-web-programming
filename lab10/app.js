const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltrounds = 16;
const users = require("./users.js");

// We create our express isntance:
const app = express();

//make the session
app.use(session({
  name: 'AuthCookie',
  secret: 'example secret for DK',
  resave: false,
  saveUninitialized: false
  //user: user
}));


app.use(function(req, response, next) {
  console.log("Current Timestamp: " + new Date().toUTCString());
  console.log("Request Method: " + req.method);
  console.log("Request Route: " + req.originalUrl);
  const auth = req.session.user ? true : false;
  console.log("UserIsAuthenticated?: " + auth);

  next();
});

var checkSession = (req, res, next) => {
  if(req.session.user){
    res.redirect('/private');
    return;
  }
  else{
    next();
  }
}

var authPrivate = (req, res, next) => {
  if(!req.session.user){
    res.status(403).redirect('/');
    return;
  }
  else{
    next();
  }
}

const exphbs = require("express-handlebars");

const static = express.static(__dirname + "/public");
app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");


// All routes are present in app.js

app.get("/", checkSession, async(req, res) => {
  try{
    res.render('layouts/login');
  } catch(e){
  res.status(404).json({ error: "Page not render-able" + e });
}
});

//cleaner way to do /login
app.post("/login", async (req, res) => {

  const aUser = users.find(user=>user.username === req.body.username);
  let match = false;
  if(aUser) match = await bcrypt.compare(req.body.password, aUser.hashedPassword);
  if (!aUser || !match) {
    //else user credentials are invalid.
    const error = "ERROR: you did not provide a valid username and/or password!";
    res.status(401).render('layouts/login', {error: error});
    return;
  } else {
    req.session.user = aUser; // store user data in the cookie except for the password
    res.redirect('/private');
  }
});
app.get('/login', async (req, res) => {
  res.redirect("/");
  return;
});
app.get("/private", authPrivate, async (req, res) => {
  try {
    if(req.session.user){
      res.render('layouts/private', {userdata: req.session.user});
      return;
    }
    else{
      res.redirect('/');
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Page not render-able" + e });
    return;
  }
});

app.get('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie("AuthCookie");
  res.render('layouts/logout');
});













app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const static = express.static(__dirname + "/public");


const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

const static = express.static(__dirname + "/public");
app.use("/public", static);
// app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");


configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
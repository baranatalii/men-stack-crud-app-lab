const express = require("express");
const db = require("./db/connection.js"); //mongoose.connection
const logger = require("morgan");
const methodOverride = require("method-override");
const path = require("path");

const app = express();

//Middleware

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

//Routes

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//DB Server Connection

db.on("connected", () => {
  console.clear();
  console.log("You are connected to the  MongoDB Database");

  app.listen(3000, () => {
    console.log("Your server is running on PORT 3000");
  });
});

const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const path = require("path");
const db = require("./db/connection.js");
const Food = require("./models/foods.js");

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/foods", async (req, res) => {
  const allFoods = await Food.find({});
  res.render("foods/index.ejs", { foods: allFoods });
});

app.get("/foods/new", (req, res) => {
  res.render("foods/new.ejs");
});

app.post("/foods", async (req, res) => {
  if (req.body.isVegetarian === "on") {
    req.body.isVegetarian = true;
  } else {
    req.body.isVegetarian = false;
  }
  await Food.create(req.body);
  res.redirect("/foods");
});

app.get("/foods/:id", async (req, res) => {
  const foundFood = await Food.findById(req.params.id);
  res.render("foods/show.ejs", { food: foundFood });
});

app.get("/foods/:id/edit", async (req, res) => {
  const foundFood = await Food.findById(req.params.id);
  res.render("foods/edit.ejs", { food: foundFood });
});

app.put("/foods/:id", async (req, res) => {
  if (req.body.isVegetarian === "on") {
    req.body.isVegetarian = true;
  } else {
    req.body.isVegetarian = false;
  }
  await Food.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/foods/${req.params.id}`);
});

app.delete("/foods/:id", async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.redirect("/foods");
});

db.on("connected", () => {
  console.clear();
  console.log("You are connected to the MongoDB Database");
  app.listen(3000, () => {
    console.log("Your server is running on PORT 3000");
  });
});

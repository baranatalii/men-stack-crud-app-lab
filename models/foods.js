const mongoose = require("mongoose");

const foodsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: String,
  calories: Number,
  description: String,
  img: String,
  isVegetarian: Boolean,
});

module.exports = mongoose.model("Food", foodsSchema);

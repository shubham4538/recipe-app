const express = require("express");

const RecipeModel = require("../models/Recipes");

const recipeRouter = express.Router();

// Get all Recipes
recipeRouter.get("/", async (req, res) => {
  const userId = res.locals.userId;
  try {
    const recipes = await RecipeModel.find({ userId: { $ne: userId } });
    res.json(recipes);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add Recipe
recipeRouter.post("/", async (req, res) => {
  const userId = res.locals.userId;
  const details = { ...req.body, userId };
  const recipe = new RecipeModel(details);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = recipeRouter;

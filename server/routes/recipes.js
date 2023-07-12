const express = require("express");

const RecipeModel = require("../models/Recipes");
const UserModel = require("../models/Users");

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

// Save Recipe
recipeRouter.put("/save", async (req, res) => {
  const userId = res.locals.userId;
  const recipeId = req.body.id;
  try {
    const recipe = await RecipeModel.findById(recipeId);
    const user = await UserModel.findById(userId);
    user.saved.push(recipe);
    await user.save();
    res.json({ message: "Recipe saved Successfully!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Unsave Recipe
recipeRouter.put("/unsave", async (req, res) => {
  const userId = res.locals.userId;
  const recipeId = req.body.id;
  try {
    const recipe = await RecipeModel.findById(recipeId);
    const user = await UserModel.findById(userId);
    const updatedSaves = (user.saved = user.saved.filter(
      (ids) => ids.toString() !== recipeId.toString()
    ));
    user.saved = updatedSaves;
    await user.save();
    res.json({ message: "Recipe unsaved Successfully!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Request Saved Recipe Array
recipeRouter.get("/saved", async (req, res) => {
  const userId = res.locals.userId;
  try {
    const user = await UserModel.findById(userId);
    res.json({ saved: user.saved });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Request Saved Recipe Object
recipeRouter.get("/savedonly", async (req, res) => {
  const userId = res.locals.userId;
  try {
    const user = await UserModel.findById(userId);
    const recipes = await RecipeModel.find({ _id: { $in: user.saved } });
    res.json(recipes);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = recipeRouter;

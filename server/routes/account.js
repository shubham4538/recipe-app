const express = require("express");

const RecipeModel = require("../models/Recipes");

const accountRouter = express.Router();

accountRouter.get("/recipes", (req, res) => {
  const userId = res.locals.userId;
  try {
    RecipeModel.find({ userId })
      .populate([{ path: "recipes", strictPopulate: false }])
      .then((user) => {
        if (!user) {
          res.status(400).json({ err: "error" });
        }
        res.json(user);
      });
  } catch (err) {
    res.status(400).json(err);
  }
});

accountRouter.post("/saved", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = accountRouter;

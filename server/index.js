const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const requireAuth = require("./middleware/requireAuth");

const authRouter = require("./routes/auth");
const recipeRouter = require("./routes/recipes");
const accountRouter = require("./routes/account");

const port = process.env.PORT || 3001;
const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);

app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);

// Auth for below routes
app.use(requireAuth);

// Authorized routes
app.use("/recipe", recipeRouter);
app.use("/account", accountRouter);

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});

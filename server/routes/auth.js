const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/Users");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    res.status(409).json({ error: "User already exists!" });
  } else {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPass });
    await newUser.save();
    res.json({ success: "Signed-Up Successfully!" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    res.status(404).json({ error: "User doesn't exists!" });
  } else {
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      res.status(401).json({ error: "User credentials Incorrect!" });
    } else {
      const token = jwt.sign({ _id: user._id }, "secret");
      res.json({ token, username: user.username });
    }
  }
});

module.exports = authRouter;

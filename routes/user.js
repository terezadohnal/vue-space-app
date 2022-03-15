const express = require("express");
const router = express.Router();
const userService = require("../service/user-service");

router.get("/", (req, res) => {
  res.send("User page");
});

router.post("/register", async (req, res) => {
  const data = req.body;

  if (
    data.username === undefined ||
    data.title?.trim() === "" ||
    data.password === undefined ||
    data.text?.trim() === ""
  ) {
    res.status(400).send("Bad input");
    return;
  }

  const hash = userService.hashPassword(data.password);
  const user = await userService.register(data, hash);

  const response = {
    message: "User registered",
    user: {
      id: user.lastID,
    },
  };

  res.status(201).send(response);
});

router.post("/login", async (req, res) => {
  const data = req.body;

  if (
    data.username === undefined ||
    data.title?.trim() === "" ||
    data.password === undefined ||
    data.text?.trim() === ""
  ) {
    res.status(400).send("Bad input");
    return;
  }

  const hash = userService.hashPassword(data.password);
  const user = await userService.getByUsername(data.username);

  if (!user) {
    return res.status(404).send("Not found");
  }

  if (user.password !== hash) {
    return res.status(401).send("Password incorrect");
  }

  const response = {
    token: await userService.generateToken(user.username),
  };

  res.status(201).send(response);
});

module.exports = router;

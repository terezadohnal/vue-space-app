const express = require("express");
const router = express.Router();
const userService = require("../service/user-service");

router.get("/", (req, res) => {
  res.send("User page");
});

router.post("/register", async (req, res) => {
  const data = req.body;

  //TODO - validace dat, porovnani hesel -> v user-service funkce validate() => true/false

  if (!validate(data)) {
    return res.status(400).send("Bad input");
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
    data.nickname === undefined ||
    data.nickname?.trim() === "" ||
    data.password === undefined ||
    data.password?.trim() === ""
  ) {
    res.status(400).send("Bad input");
    return;
  }

  const hash = userService.hashPassword(data.password);
  const user = await userService.getByNickname(data.nickname);

  if (!user) {
    return res.status(404).send("Not found");
  }

  if (user.password !== hash) {
    return res.status(401).send("Password incorrect");
  }

  const response = {
    message: "User logged in",
    token: await userService.generateToken(user.nickname),
  };

  res.status(201).send(response);
});

module.exports = router;

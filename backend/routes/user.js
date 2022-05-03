const express = require("express");
const router = express.Router();
const userService = require("../service/user-service");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const data = await userService.getById(id);
  const response = {
    id: data.user_id,
    nickname: data.nickname,
    firstname: data.firstname,
    lastname: data.lastname,
    role: data.role,
    email: data.email,
  };
  res.send(response);
});

router.post("/register", async (req, res) => {
  const data = req.body;

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
    token: await userService.generateToken(user),
    user: {
      id: user.user_id,
    },
  };

  res.status(201).send(response);
});

module.exports = router;

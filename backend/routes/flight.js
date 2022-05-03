const express = require("express");
const router = express.Router();
const flightService = require("../service/flight-service");

router.get("/", async (req, res) => {
  const flights = await flightService.getAll();
  res.json(flights);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const flight = await flightService.getById(id);

  if (flight) {
    res.json(flight);
  } else {
    res.status(404).send("Not found");
  }
});

router.post("/", async (req, res) => {
  // nemusime uvadet /create
  const data = req.body;

  // TODO dodelat pro vsechny
  if (
    data.name === undefined ||
    data.name?.trim() === "" ||
    data.aircraft === undefined ||
    data.aircraft?.trim() === "" ||
    data.departure === undefined ||
    data.departure === "0000-00-00 00:00:00" ||
    data.destination === undefined ||
    data.destination?.trim() === ""
  ) {
    res.status(400).send("Bad input");
    return;
  }

  const flight = flightService.create(data);
  res.status(201).json(flight);
});

module.exports = router;

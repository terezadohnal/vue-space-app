const { response } = require('express');
const express = require('express');
const router = express.Router();
const flightService = require('../service/flight-service');
const reservationService = require('../service/reservation-service');

router.get('/', async (req, res) => {
  const flights = await flightService.getAll();
  res.json(flights);
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const flight = await flightService.getById(id);

  if (flight) {
    res.json(flight);
  } else {
    res.status(404).send('Not found');
  }
});

router.post('/', async (req, res) => {
  // nemusime uvadet /create
  const data = req.body;

  // TODO dodelat pro vsechny
  if (
    data.name === undefined ||
    data.name?.trim() === '' ||
    data.aircraft === undefined ||
    data.aircraft?.trim() === '' ||
    data.departure === undefined ||
    data.departure === '0000-00-00 00:00:00' ||
    data.destination === undefined ||
    data.destination?.trim() === ''
  ) {
    res.status(400).send('Bad input');
    return;
  }
  const flight = await flightService.create(data);
  res.status(201).json(flight);
});

router.post('/reservation', async (req, res) => {
  const data = req.body;

  if (
    data.flight_id == undefined ||
    data.flight_id < 0 ||
    data.user_id == undefined ||
    data.user_id < 0
  ) {
    res.status(400).send('Bad input');
    return;
  }

  const reservation = await reservationService.createReservation(data);

  res.status(201).json(reservation);
});

router.get('/reservation/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const reservations = await reservationService.getReservedFlights(id);
  console.log(reservations);
  if (reservations) {
    res.status(201).json(reservations);
  } else {
    res.status(404).send('Not found');
  }
});

router.delete('/reservation/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await reservationService.deleteReservation(id);
  res.status(204).send('No Content');
});

module.exports = router;

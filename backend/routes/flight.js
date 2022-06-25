const { response } = require('express');
const express = require('express');
const router = express.Router();
const flightService = require('../service/flight-service');
const reservationService = require('../service/reservation-service');
const notificationService = require('../service/notification-service');

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
  const data = req.body;
  if (
    data.name === undefined ||
    data.name?.trim() === '' ||
    data.aircraft === undefined ||
    data.aircraft?.trim() === '' ||
    data.company === undefined ||
    data.company?.trim() === '' ||
    data.departure === undefined ||
    data.departure === '0000-00-00 00:00:00' ||
    data.destination === undefined ||
    data.destination?.trim() === '' ||
    data.seats === undefined ||
    data.seats === 0
  ) {
    res.status(400).send('Bad input');
    return;
  }
  const flight = await flightService.create(data);

  if (flight) {
    await notificationService.create(
      1,
      `New flight added: ${flight.name}. Destination: ${flight.destination}. At: ${flight.departure}`,
      'success'
    );
  } else {
    await notificationService.create(
      1,
      `Failed to add new flight with id: ${flight.flight_id}`,
      'error'
    );
  }

  res.status(201).json(flight);
});

router.post('/reservation', async (req, res) => {
  const data = req.body;

  if (
    data.flight_id === undefined ||
    data.flight_id < 0 ||
    data.user_id === undefined ||
    data.user_id < 0
  ) {
    res.status(400).send('Bad input');
    return;
  }

  const reservation = await reservationService.createReservation(data);
  if (reservation) {
    await notificationService.create(
      data.user_id,
      `You just created new reservation no. ${reservation.reservation_id} on flight: ${reservation.flight_id}.`,
      'success'
    );
  } else {
    await notificationService.create(
      data.user_id,
      `Ooops, seams like you're not going anywhere. Creating reservation failed}.`,
      'error'
    );
  }

  res.status(201).json(reservation);
});

router.get('/reservation/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const reservations = await reservationService.getReservedFlights(id);
  if (reservations) {
    res.status(201).json(reservations);
  } else {
    res.status(404).send('Not found');
  }
});

router.delete('/reservation/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(req.body.user_id);
  const user_id = req.body.user_id; // nefunguje!!!
  console.log(user_id);
  const result = await reservationService.deleteReservation(id);
  if (result) {
    await notificationService.create(
      1,
      `You just deleted your reservation.`,
      'error'
    );
  } else {
    await notificationService.create(
      1,
      `Ooops, deleting reservation failed.`,
      'error'
    );
  }
  res.status(204).send('No Content');
});

router.get('/reservation/passagers/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const passagers = await reservationService.getPassagersInFlight(id);
  if (passagers) {
    res.status(201).json(passagers);
  } else {
    res.status(404).send('Not found');
  }
});
router.post('/reservation/passagers', async (req, res) => {
  const data = req.body;
  if (
    data.reservation_id === undefined ||
    data.reservation_id < 0 ||
    data.passagers.length <= 0
  ) {
    res.status(400).send('Bad input');
    return;
  }

  const newPassagers = await reservationService.addPassagersToReservation(data);
  if (newPassagers) {
    res.status(201).json(newPassagers);
  } else {
    res.status(404).send('Not found');
  }

  //notifikace
});

router.get('/reservation/passagersInFlight/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (id === undefined || id <= 0) {
    res.status(400).send('Bad input');
  }

  const number = await reservationService.getNumberOfPassagersInFlight(id);
  res.status(200).json(number);
});

router.post('/status', async (req, res) => {
  const data = req.body;
  const status = await flightService.setFlightStatus(data);
  if (status) {
    res.status(201).json(status);
  } else {
    res.status(404).send('Not found');
  }
});

module.exports = router;

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
    await notificationService.create({
      user_id: data.user_id,
      title: `New flight added: ${flight.name}. Destination: ${flight.destination}. At: ${flight.departure}`,
      type: 'success',
    });
  } else {
    await notificationService.create({
      user_id: data.user_id,
      title: `Failed to add new flight with id: ${flight.flight_id}`,
      type: 'error',
    });
  }

  if (flight) {
    await flightService.setFlightStatus({
      flight_id: flight.flight_id,
      status: 'To be departed',
    });
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
    await notificationService.create({
      user_id: data.user_id,
      title: `You just created new reservation no. ${reservation.reservation_id} on flight: ${reservation.flight_id}.`,
      type: 'success',
    });
  } else {
    await notificationService.create({
      user_id: data.user_id,
      title: `Ooops, seams like you're not going anywhere. Creating reservation failed}.`,
      type: 'error',
    });
  }

  res.status(201).json(reservation);
});

router.get('/reservations/all', async (req, res) => {
  const reservations = await reservationService.getAll();
  res.json(reservations);
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
  const user_id = req.body.user_id;
  const result = await reservationService.deleteReservation(id);
  if (result) {
    await notificationService.create({
      user_id: user_id,
      title: `You just deleted your reservation.`,
      type: 'warning',
    });
  } else {
    await notificationService.create({
      user_id: user_id,
      title: `Ooops, deleting reservation failed.`,
      type: 'error',
    });
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
  console.log(data);
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

  if (newPassagers) {
    await notificationService.create({
      user_id: data.user_id,
      title: `You just added new passagers to your reservation.`,
      type: 'success',
    });
  } else {
    await notificationService.create({
      user_id: data.user_id,
      title: `Ooops, adding passagers to your reservation failed.`,
      type: 'error',
    });
  }
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

router.get('/status/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const status = await flightService.getStatusById(id);
  res.status(200).json(status);
});

module.exports = router;

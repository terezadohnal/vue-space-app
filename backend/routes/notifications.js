const express = require('express');
const { database } = require('../database/database');
const router = express.Router();
const notificationService = require('../service/notification-service');

// homepage
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await notificationService.getAll(id);
  res.json(result);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const result = await notificationService.create(data);
  res.json(result);
});

module.exports = router;

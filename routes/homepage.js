const express = require("express");
const router = express.Router();

// homepage
router.get("/", (req, res) => {
  res.send("Hello my space friends");
});

module.exports = router;

const express = require('express');

const router = express.Router();

// Get candidate applications
router.get('/applications', (req, res) => {
  res.json({ data: [] });
});

// Get learning resources
router.get('/learning-resources', (req, res) => {
  res.json({ data: [] });
});

// Get learning progress
router.get('/learning-progress', (req, res) => {
  res.json({ data: [] });
});

// Get interviews
router.get('/interviews', (req, res) => {
  res.json({ data: [] });
});

module.exports = router;

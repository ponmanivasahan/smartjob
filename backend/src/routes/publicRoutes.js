const express = require('express');

const router = express.Router();

const jobs = [];

// Get public jobs
router.get('/jobs', (req, res) => {
  res.json({ data: jobs, count: jobs.length });
});

// Get job by ID
router.get('/jobs/:jobId', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.jobId));
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

module.exports = router;

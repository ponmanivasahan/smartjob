const express = require('express');

const router = express.Router();

// Mock data
const jobs = [];
const candidates = [];

// Get all candidates
router.get('/candidates', (req, res) => {
  res.json({ data: candidates, count: candidates.length });
});

// Get all jobs
router.get('/jobs', (req, res) => {
  res.json({ data: jobs, count: jobs.length });
});

// Post a job
router.post('/jobs', (req, res) => {
  const { company_name, job_title, description, salary_min, salary_max, location, job_type } = req.body;
  const newJob = {
    id: jobs.length + 1,
    company_name,
    job_title,
    description,
    salary_min,
    salary_max,
    location,
    job_type,
    status: 'active',
    created_at: new Date()
  };
  jobs.push(newJob);
  res.status(201).json({ message: 'Job posted successfully', jobId: newJob.id });
});

module.exports = router;

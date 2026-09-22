const express = require('express');
const router = express.Router();

/**
 * GET /api/health
 * Basic health check endpoint
 */
router.get('/', (req, res) => {
  return res.json({
    status: 'ok',
    service: 'TruthLens Misinformation Triage API',
    timestamp: new Date().toISOString(),
    hackathonId: 'Haridwar Team 58'
  });
});

module.exports = router;

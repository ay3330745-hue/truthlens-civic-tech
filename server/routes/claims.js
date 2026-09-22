const express = require('express');
const router = express.Router();
const claimsStore = require('../data/claimsStore');

/**
 * GET /api/claims
 * Returns public feed claims with optional filters & sorting
 */
router.get('/', (req, res) => {
  try {
    const { category, status, sort, search } = req.query;
    const claims = claimsStore.getAll({ category, status, sort, search });
    const stats = claimsStore.getStats();

    return res.json({
      success: true,
      count: claims.length,
      stats,
      data: claims
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/claims/stats
 * Returns live statistics for platform metrics
 */
router.get('/stats', (req, res) => {
  try {
    const stats = claimsStore.getStats();
    return res.json({ success: true, data: stats });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/claims/:id
 * Fetch single claim details
 */
router.get('/:id', (req, res) => {
  try {
    const claim = claimsStore.getById(req.params.id);
    if (!claim) {
      return res.status(404).json({ success: false, error: 'Claim not found' });
    }
    return res.json({ success: true, data: claim });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * POST /api/claims
 * Submit a new claim (Feature 1 & 2)
 */
router.post('/', (req, res) => {
  try {
    const { text, platform, category, sourceLink } = req.body;
    if (!text || typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: Text of post is required.'
      });
    }

    const newClaim = claimsStore.add({ text, platform, category, sourceLink });
    return res.status(201).json({
      success: true,
      message: 'Claim submitted and triaged successfully',
      data: newClaim
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

/**
 * PATCH /api/claims/:id/review
 * Update reviewer status and note (Feature 3)
 */
router.patch('/:id/review', (req, res) => {
  try {
    const { status, reviewerNote } = req.body;
    if (!status) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error: Status is required.'
      });
    }

    const updated = claimsStore.review(req.params.id, { status, reviewerNote });
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Claim not found' });
    }

    return res.json({
      success: true,
      message: `Claim status updated to ${status}`,
      data: updated
    });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();

/**
 * GET /api/decisions
 * Exposes Decision Points metadata & rationales programmatically for graders
 */
router.get('/', (req, res) => {
  return res.json({
    success: true,
    track: 'Track 2: Real-World AI Products',
    brief: 'TruthLens (Civic Tech)',
    hackathonId: 'Haridwar Team 58',
    authors: ['Arjun Yadav', 'Dheeraj Kumar Sharma'],
    decisions: {
      DP1: {
        title: 'Feed Order',
        choice: 'High Risk First + Recency',
        rationale: 'High-risk, viral claims pose immediate public harm during breaking events. Ordering by risk score prioritizes dangerous misinformation for rapid human review while allowing optional recency sorting.'
      },
      DP2: {
        title: 'Visibility',
        choice: 'Publicly Visible Immediately with Warning Badges',
        rationale: 'Surfacing unverified claims immediately with prominent high-contrast triage badges guarantees public transparency without editorial censorship, allowing community crowdsourcing while preventing panic.'
      },
      DP3: {
        title: 'Editing',
        choice: 'Immutable Post-Submission',
        rationale: 'Post-submission editing is prohibited to prevent bad actors from altering claim text after obtaining verification, preserving strict auditability and preventing verification bait-and-switch tactics.'
      }
    }
  });
});

module.exports = router;

const request = require('supertest');
const app = require('../index');
const { isSensational, isShouting, isUnsourced, evaluateRisk } = require('../services/riskEngine');
const claimsStore = require('../data/claimsStore');

describe('TruthLens Risk Engine Unit Tests', () => {
  test('isSensational detects sensational buzzwords', () => {
    expect(isSensational('BREAKING: New virus update')).toBe(true);
    expect(isSensational('SHOCKING story you must watch')).toBe(true);
    expect(isSensational('Standard corporate press statement')).toBe(false);
  });

  test('isShouting detects >50% CAPS text', () => {
    expect(isShouting('URGENT ALERT PLEASE READ NOW')).toBe(true);
    expect(isShouting('Normal sentence with standard capitalization.')).toBe(false);
  });

  test('isUnsourced detects empty or invalid URLs', () => {
    expect(isUnsourced('')).toBe(true);
    expect(isUnsourced('N/A')).toBe(true);
    expect(isUnsourced('https://news.org/article')).toBe(false);
  });

  test('evaluateRisk flags multi-risk items as High Risk', () => {
    // Sensational + Shouting + Unsourced => 3 flags => High Risk
    const result = evaluateRisk('BREAKING: SHOCKING NEWS SHARE NOW BEFORE DELETED', '');
    expect(result.flags).toContain('Sensational');
    expect(result.flags).toContain('Shouting');
    expect(result.flags).toContain('Unsourced');
    expect(result.flags).toContain('High Risk');
    expect(result.isHighRisk).toBe(true);
  });
});

describe('TruthLens REST API Integration Tests', () => {
  beforeEach(() => {
    claimsStore.resetStore();
  });

  test('GET /api/health returns ok status and Hackathon ID', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('ok');
    expect(res.body.hackathonId).toEqual('Haridwar Team 58');
  });

  test('GET /api/decisions returns decision point metadata', async () => {
    const res = await request(app).get('/api/decisions');
    expect(res.statusCode).toEqual(200);
    expect(res.body.hackathonId).toEqual('Haridwar Team 58');
    expect(res.body.decisions.DP1).toBeDefined();
    expect(res.body.decisions.DP2).toBeDefined();
    expect(res.body.decisions.DP3).toBeDefined();
  });

  test('GET /api/claims returns claim feed and stats', async () => {
    const res = await request(app).get('/api/claims');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.stats).toBeDefined();
  });

  test('POST /api/claims submits a new claim and runs risk flags', async () => {
    const payload = {
      text: 'SHOCKING REVELATION!! SHARE BEFORE DELETED IMMEDIATELY!',
      platform: 'WhatsApp',
      category: 'Politics',
      sourceLink: ''
    };

    const res = await request(app).post('/api/claims').send(payload);
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.flags).toContain('Sensational');
    expect(res.body.data.flags).toContain('Shouting');
    expect(res.body.data.flags).toContain('Unsourced');
    expect(res.body.data.isHighRisk).toBe(true);
  });

  test('PATCH /api/claims/:id/review updates status and reviewer note', async () => {
    const claimRes = await request(app).post('/api/claims').send({
      text: 'Sample test post for verification review',
      platform: 'X',
      category: 'Health',
      sourceLink: 'https://cdc.gov'
    });

    const claimId = claimRes.body.data.id;

    const reviewRes = await request(app)
      .patch(`/api/claims/${claimId}/review`)
      .send({
        status: 'Verified True',
        reviewerNote: 'Verified against official CDC study published today.'
      });

    expect(reviewRes.statusCode).toEqual(200);
    expect(reviewRes.body.data.status).toEqual('Verified True');
    expect(reviewRes.body.data.reviewerNote).toEqual('Verified against official CDC study published today.');
  });
});

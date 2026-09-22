const fs = require('fs');
const path = require('path');
const { evaluateRisk } = require('../services/riskEngine');

const SEED_FILE = path.join(__dirname, 'seedData.json');

class ClaimsStore {
  constructor() {
    this.claims = [];
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(SEED_FILE)) {
        const raw = fs.readFileSync(SEED_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.claims = parsed.map((item) => this.processClaim(item));
      } else {
        this.claims = [];
      }
    } catch (err) {
      console.error('Failed to load seed data:', err);
      this.claims = [];
    }
  }

  processClaim(raw) {
    const risk = evaluateRisk(raw.text, raw.sourceLink);
    return {
      id: raw.id || `claim-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      text: raw.text,
      platform: raw.platform || 'Other',
      category: raw.category || 'Other',
      sourceLink: raw.sourceLink || '',
      status: raw.status || 'Unverified',
      reviewerNote: raw.reviewerNote || null,
      reviewedAt: raw.reviewedAt || null,
      createdAt: raw.createdAt || new Date().toISOString(),
      flags: risk.flags,
      isHighRisk: risk.isHighRisk,
      breakdown: risk.breakdown
    };
  }

  getAll({ category, status, sort = 'risk', search } = {}) {
    let result = [...this.claims];

    // Filter by Category
    if (category && category !== 'All') {
      result = result.filter(
        (c) => c.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by Status
    if (status && status !== 'All') {
      if (status === 'High Risk') {
        result = result.filter((c) => c.isHighRisk);
      } else {
        result = result.filter(
          (c) => c.status.toLowerCase() === status.toLowerCase()
        );
      }
    }

    // Filter by Search Query
    if (search && search.trim() !== '') {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.text.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.platform.toLowerCase().includes(q)
      );
    }

    // Sorting (DP1 Feed order logic)
    if (sort === 'risk') {
      // High Risk first, then newest
      result.sort((a, b) => {
        if (a.isHighRisk && !b.isHighRisk) return -1;
        if (!a.isHighRisk && b.isHighRisk) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (sort === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      // Default / 'recency'
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }

  getById(id) {
    return this.claims.find((c) => c.id === id) || null;
  }

  add({ text, platform, category, sourceLink }) {
    if (!text || text.trim() === '') {
      throw new Error('Claim text is required.');
    }

    const raw = {
      id: `claim-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      text: text.trim(),
      platform: platform || 'Other',
      category: category || 'Other',
      sourceLink: sourceLink ? sourceLink.trim() : '',
      status: 'Unverified',
      reviewerNote: null,
      reviewedAt: null,
      createdAt: new Date().toISOString()
    };

    const newClaim = this.processClaim(raw);
    this.claims.unshift(newClaim);
    return newClaim;
  }

  review(id, { status, reviewerNote }) {
    const claim = this.getById(id);
    if (!claim) {
      return null;
    }

    const validStatuses = ['Verified True', 'Verified False', 'Misleading', 'Unverified'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    claim.status = status;
    claim.reviewerNote = reviewerNote ? reviewerNote.trim() : '';
    claim.reviewedAt = new Date().toISOString();

    return claim;
  }

  getStats() {
    const total = this.claims.length;
    const unverified = this.claims.filter((c) => c.status === 'Unverified').length;
    const verifiedTrue = this.claims.filter((c) => c.status === 'Verified True').length;
    const verifiedFalse = this.claims.filter((c) => c.status === 'Verified False').length;
    const misleading = this.claims.filter((c) => c.status === 'Misleading').length;
    const highRisk = this.claims.filter((c) => c.isHighRisk).length;

    return {
      total,
      unverified,
      verifiedTrue,
      verifiedFalse,
      misleading,
      highRisk
    };
  }

  resetStore() {
    this.init();
  }
}

module.exports = new ClaimsStore();

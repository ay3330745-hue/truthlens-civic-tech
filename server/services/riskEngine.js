/**
 * TruthLens Automated Risk Flags Engine
 * Evaluates claims based on text indicators and source provenance.
 */

const SENSATIONAL_KEYWORDS = [
  'breaking',
  'shocking',
  'share before deleted',
  'must watch',
  'unbelievable',
  'viral',
  'secret revealed',
  'urgent alert',
  'hidden truth',
  'don\'t let them delete'
];

/**
 * Checks if text contains sensational trigger keywords
 */
function isSensational(text) {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  return SENSATIONAL_KEYWORDS.some((kw) => lowerText.includes(kw));
}

/**
 * Checks if >50% of alphabetic characters are uppercase ("Shouting")
 */
function isShouting(text) {
  if (!text) return false;
  const letters = text.replace(/[^a-zA-Z]/g, '');
  if (letters.length < 6) return false; // Minimum length check to prevent false positives on short acronyms

  let upperCount = 0;
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === letters[i].toUpperCase()) {
      upperCount++;
    }
  }

  const ratio = upperCount / letters.length;
  return ratio > 0.5;
}

/**
 * Checks if source link is missing or empty ("Unsourced")
 */
function isUnsourced(sourceLink) {
  if (!sourceLink || typeof sourceLink !== 'string') return true;
  const trimmed = sourceLink.trim();
  if (trimmed === '' || trimmed === 'N/A' || trimmed === 'none') return true;
  
  try {
    const url = new URL(trimmed);
    return false;
  } catch (err) {
    return true;
  }
}

/**
 * Analyzes a claim and returns flag details & risk evaluation
 */
function evaluateRisk(text, sourceLink) {
  const flags = [];

  if (isSensational(text)) {
    flags.push('Sensational');
  }

  if (isShouting(text)) {
    flags.push('Shouting');
  }

  if (isUnsourced(sourceLink)) {
    flags.push('Unsourced');
  }

  const isHighRisk = flags.length >= 2;
  if (isHighRisk) {
    flags.push('High Risk');
  }

  return {
    flags,
    isHighRisk,
    flagCount: flags.filter((f) => f !== 'High Risk').length,
    breakdown: {
      sensational: flags.includes('Sensational'),
      shouting: flags.includes('Shouting'),
      unsourced: flags.includes('Unsourced')
    }
  };
}

module.exports = {
  evaluateRisk,
  isSensational,
  isShouting,
  isUnsourced
};

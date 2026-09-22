import React, { useState, useMemo } from 'react';
import { X, Send, AlertTriangle, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { submitClaim } from '../services/api';

export default function ClaimSubmission({ isOpen, onClose, onSuccess }) {
  const [text, setText] = useState('');
  const [platform, setPlatform] = useState('WhatsApp');
  const [category, setCategory] = useState('Politics');
  const [sourceLink, setSourceLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Real-time risk preview logic
  const liveAnalysis = useMemo(() => {
    if (!text.trim()) return null;

    const lower = text.toLowerCase();
    const sensationalKeywords = ['breaking', 'shocking', 'share before deleted', 'must watch', 'unbelievable', 'viral', 'secret revealed', 'urgent alert'];
    const isSensational = sensationalKeywords.some((kw) => lower.includes(kw));

    const letters = text.replace(/[^a-zA-Z]/g, '');
    let upperCount = 0;
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] === letters[i].toUpperCase()) upperCount++;
    }
    const capsRatio = letters.length > 5 ? (upperCount / letters.length) : 0;
    const isShouting = capsRatio > 0.5;

    const isUnsourced = !sourceLink || sourceLink.trim() === '';

    const flags = [];
    if (isSensational) flags.push('Sensational');
    if (isShouting) flags.push('Shouting');
    if (isUnsourced) flags.push('Unsourced');

    const isHighRisk = flags.length >= 2;
    if (isHighRisk) flags.push('High Risk');

    return {
      flags,
      isHighRisk,
      isSensational,
      isShouting,
      isUnsourced,
      capsPercentage: Math.round(capsRatio * 100)
    };
  }, [text, sourceLink]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter the post text.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await submitClaim({
        text,
        platform,
        category,
        sourceLink
      });
      onSuccess(res.data);
      setText('');
      setSourceLink('');
      setPlatform('WhatsApp');
      setCategory('Politics');
      onClose();
    } catch (err) {
      setError(err.message || 'Error submitting claim.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="glass-panel border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-900/80 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></div>
            <h2 className="text-sm sm:text-lg font-bold text-slate-100">Submit Claim for Automated Triage</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-950/50 border border-rose-800/80 rounded-xl text-xs text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Post Text Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Post / Message Text <span className="text-rose-400">*</span>
              </label>
              {liveAnalysis && (
                <span className={`text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded ${
                  liveAnalysis.isShouting ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60' : 'text-slate-400'
                }`}>
                  CAPS: {liveAnalysis.capsPercentage}% {liveAnalysis.isShouting && '(Shouting)'}
                </span>
              )}
            </div>
            <textarea
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the viral claim text here (e.g., 'BREAKING: EMERGENCY BAN...')"
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Platform & Category Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Source Platform
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="WhatsApp">WhatsApp</option>
                <option value="X">X (Twitter)</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Telegram">Telegram</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Claim Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Politics">Politics</option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Source Link */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center space-x-1">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>Source URL (Optional)</span>
            </label>
            <input
              type="url"
              value={sourceLink}
              onChange={(e) => setSourceLink(e.target.value)}
              placeholder="https://x.com/username/status/123456"
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Real-time Triage Preview Card */}
          {liveAnalysis && (
            <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                <span>Automated Risk Triage Preview:</span>
                {liveAnalysis.isHighRisk ? (
                  <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-md flex items-center space-x-1 text-[11px]">
                    <AlertTriangle className="w-3 h-3" />
                    <span>High Risk</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 rounded-md text-[11px]">
                    Standard Risk
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {liveAnalysis.flags.map((flag) => (
                  <span
                    key={flag}
                    className={`text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md ${
                      flag === 'High Risk'
                        ? 'bg-rose-950 text-rose-300 border border-rose-700/80'
                        : flag === 'Sensational'
                        ? 'bg-amber-950 text-amber-300 border border-amber-700/80'
                        : flag === 'Shouting'
                        ? 'bg-orange-950 text-orange-300 border border-orange-700/80'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    🚩 {flag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Submit Actions */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-800 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/30 transition disabled:opacity-50"
            >
              {loading ? (
                <span>Triaging...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Submit Claim</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

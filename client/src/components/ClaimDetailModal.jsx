import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Link as LinkIcon, Clock, MessageSquare, Send } from 'lucide-react';
import { reviewClaim } from '../services/api';

export default function ClaimDetailModal({ claim, isOpen, onClose, onReviewSuccess }) {
  if (!isOpen || !claim) return null;

  const [status, setStatus] = useState(claim.status || 'Verified True');
  const [reviewerNote, setReviewerNote] = useState(claim.reviewerNote || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (claim) {
      setStatus(claim.status === 'Unverified' ? 'Verified True' : claim.status);
      setReviewerNote(claim.reviewerNote || '');
      setError(null);
    }
  }, [claim]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewerNote.trim()) {
      setError('Please provide a short reviewer note explaining your verification verdict.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await reviewClaim(claim.id, { status, reviewerNote });
      onReviewSuccess(res.data);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-slate-100">Claim Detail & Fact-Checking Workflow</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Claim Full Text Section */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-blue-400">CLAIM ID: {claim.id}</span>
              <span>Submitted: {new Date(claim.createdAt).toLocaleString()}</span>
            </div>
            <p className="text-base text-slate-100 leading-relaxed font-medium">
              "{claim.text}"
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div>
                Platform: <span className="text-slate-200 font-semibold">{claim.platform}</span>
              </div>
              <div>
                Category: <span className="text-slate-200 font-semibold">{claim.category}</span>
              </div>
              <div>
                Source Link: {' '}
                {claim.sourceLink ? (
                  <a
                    href={claim.sourceLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline hover:text-blue-300 inline-flex items-center space-x-1"
                  >
                    <LinkIcon className="w-3 h-3 inline mr-0.5" />
                    <span>{claim.sourceLink}</span>
                  </a>
                ) : (
                  <span className="text-amber-400 italic">None provided (Unsourced)</span>
                )}
              </div>
            </div>
          </div>

          {/* Automated Risk Flags Breakdown */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Automated Risk Engine Analysis
              </h3>
              {claim.isHighRisk && (
                <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-md text-xs font-bold flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>High Risk Triggered (2+ Flags)</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Sensational Check */}
              <div className={`p-3 rounded-lg border text-xs ${
                claim.breakdown?.sensational
                  ? 'bg-amber-950/40 border-amber-800/80 text-amber-200'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400'
              }`}>
                <div className="font-semibold mb-1">Sensational Keywords</div>
                <p>{claim.breakdown?.sensational ? 'Detected viral urgency words (breaking, shocking, etc.)' : 'No sensational keywords detected'}</p>
              </div>

              {/* Shouting Check */}
              <div className={`p-3 rounded-lg border text-xs ${
                claim.breakdown?.shouting
                  ? 'bg-orange-950/40 border-orange-800/80 text-orange-200'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400'
              }`}>
                <div className="font-semibold mb-1">{"Shouting (>50% CAPS)"}</div>
                <p>{claim.breakdown?.shouting ? 'High ratio of uppercase lettering detected' : 'Standard capitalization'}</p>
              </div>

              {/* Unsourced Check */}
              <div className={`p-3 rounded-lg border text-xs ${
                claim.breakdown?.unsourced
                  ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                  : 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
              }`}>
                <div className="font-semibold mb-1">Provenance Source</div>
                <p>{claim.breakdown?.unsourced ? 'No valid source URL provided' : 'Valid source URL attached'}</p>
              </div>
            </div>
          </div>

          {/* Current Status Banner */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Current Status</span>
              <span className="text-base font-bold text-slate-100">{claim.status}</span>
            </div>
            {claim.reviewerNote && (
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-medium">Last Reviewed</span>
                <span className="text-xs text-slate-300 font-mono">
                  {claim.reviewedAt ? new Date(claim.reviewedAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            )}
          </div>

          {/* Reviewer Triage Workflow Form */}
          <form onSubmit={handleReviewSubmit} className="p-5 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-4">
            <h3 className="text-sm font-bold text-blue-300 flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span>Reviewer Verification Workflow</span>
            </h3>

            {error && (
              <div className="p-3 bg-rose-950/60 border border-rose-800 rounded-lg text-xs text-rose-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Set Verification Verdict
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                
                <button
                  type="button"
                  onClick={() => setStatus('Verified True')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition ${
                    status === 'Verified True'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified True</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('Verified False')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition ${
                    status === 'Verified False'
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <XCircle className="w-4 h-4" />
                  <span>Verified False</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('Misleading')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-2 transition ${
                    status === 'Misleading'
                      ? 'bg-orange-600 text-white border-orange-500 shadow-md shadow-orange-600/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Misleading</span>
                </button>

              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Fact-Checker Review Note <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={3}
                value={reviewerNote}
                onChange={(e) => setReviewerNote(e.target.value)}
                placeholder="Explain the fact-checking evidence, official sources consulted, or context..."
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/30 transition disabled:opacity-50"
              >
                {loading ? (
                  <span>Updating Review...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Review Verdict</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

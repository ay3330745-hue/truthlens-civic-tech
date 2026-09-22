import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, ShieldAlert, Zap, Lock, Info, Code } from 'lucide-react';
import { fetchDecisions } from '../services/api';

export default function DecisionPointsView() {
  const [decisions, setDecisions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDecisions()
      .then((res) => {
        setDecisions(res.decisions);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load decisions:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Overview Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-blue-900/40 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            Hackathon Decision Points Documentation (<code className="text-blue-300">DECISIONS.md</code>)
          </h2>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
          Track 2 requires documenting choices for three deliberately undefined decision points. Below are the design decisions implemented in TruthLens, complete with rationale and live behavioral guarantees.
        </p>
      </div>

      {/* Decision Point 1 */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-700/60">
              DECISION POINT 1 (DP1)
            </span>
            <h3 className="text-lg font-bold text-slate-100 mt-1">Feed Ordering Strategy</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center space-x-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Implemented: High Risk First</span>
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs text-slate-300">
          <span className="font-semibold text-blue-400 block">Design Rationale:</span>
          <p className="leading-relaxed">
            {decisions?.DP1?.rationale ||
              "In high-velocity misinformation environments (such as elections or health panics), fact-checkers face asymmetric incoming post volume. Sorting by automated risk score ensures multi-flagged, high-harm claims are prioritized for human triage immediately rather than getting buried under low-risk posts."}
          </p>
        </div>

        <div className="text-xs text-slate-400 flex items-center space-x-2 pt-1">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Live App Behavior: Default feed sort query parameter <code className="text-slate-200">sort=risk</code> orders multi-flagged claims at top.</span>
        </div>
      </div>

      {/* Decision Point 2 */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-700/60">
              DECISION POINT 2 (DP2)
            </span>
            <h3 className="text-lg font-bold text-slate-100 mt-1">Unverified Claim Visibility</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center space-x-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Implemented: Visible with Badges</span>
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs text-slate-300">
          <span className="font-semibold text-blue-400 block">Design Rationale:</span>
          <p className="leading-relaxed">
            {decisions?.DP2?.rationale ||
              "Holding back unverified claims behind a review queue risks censorship allegations and delays public awareness. Surfacing unverified claims immediately with high-contrast warning badges guarantees transparency while preventing unverified panics."}
          </p>
        </div>

        <div className="text-xs text-slate-400 flex items-center space-x-2 pt-1">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <span>Live App Behavior: All unverified claims show prominent amber <code className="text-amber-300">Unverified / Triage Pending</code> badges.</span>
        </div>
      </div>

      {/* Decision Point 3 */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-700/60">
              DECISION POINT 3 (DP3)
            </span>
            <h3 className="text-lg font-bold text-slate-100 mt-1">Post-Submission Editing Rules</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center space-x-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Implemented: Immutable Claims</span>
          </span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs text-slate-300">
          <span className="font-semibold text-blue-400 block">Design Rationale:</span>
          <p className="leading-relaxed">
            {decisions?.DP3?.rationale ||
              "Allowing post-submission edits introduces critical security vulnerabilities where bad actors submit benign text, wait for a 'Verified True' rating, and subsequently alter text to spread false narratives under a verified status. Immutability preserves audit integrity."}
          </p>
        </div>

        <div className="text-xs text-slate-400 flex items-center space-x-2 pt-1">
          <Lock className="w-4 h-4 text-indigo-400" />
          <span>Live App Behavior: Claim modification API routes are disabled; edits require submitting a new claim for triage.</span>
        </div>
      </div>

      {/* Programmatic API Spec note */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-blue-400" />
          <span>Programmatic Endpoint for Grader Scripts:</span>
        </div>
        <a
          href="/api/decisions"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:underline font-mono"
        >
          GET /api/decisions
        </a>
      </div>

    </div>
  );
}

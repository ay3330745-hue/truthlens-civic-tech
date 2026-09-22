import React from 'react';
import { AlertTriangle, Clock, ExternalLink, MessageCircle, Twitter, Instagram, Send, Globe, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

const platformIcons = {
  WhatsApp: <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />,
  X: <Twitter className="w-3.5 h-3.5 text-sky-400" />,
  Instagram: <Instagram className="w-3.5 h-3.5 text-pink-400" />,
  Telegram: <Send className="w-3.5 h-3.5 text-blue-400" />,
  Facebook: <Globe className="w-3.5 h-3.5 text-indigo-400" />,
  Other: <Globe className="w-3.5 h-3.5 text-slate-400" />
};

export default function ClaimCard({ claim, onOpenDetail }) {
  const { id, text, platform, category, sourceLink, status, flags = [], isHighRisk, reviewerNote, createdAt } = claim;

  const formattedDate = new Date(createdAt).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className={`glass-card rounded-2xl p-5 border flex flex-col justify-between transition-all ${
      isHighRisk 
        ? 'border-rose-900/40 hover:border-rose-600/50 bg-slate-900/70' 
        : 'border-slate-800 hover:border-blue-500/40'
    }`}>
      
      <div>
        {/* Top Meta Line: Platform, Category, Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          
          <div className="flex items-center space-x-2">
            <span className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium">
              {platformIcons[platform] || platformIcons.Other}
              <span>{platform}</span>
            </span>

            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 font-medium">
              {category}
            </span>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-1">
            {status === 'Unverified' && (
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center space-x-1">
                <HelpCircle className="w-3 h-3" />
                <span>Unverified</span>
              </span>
            )}
            {status === 'Verified True' && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified True</span>
              </span>
            )}
            {status === 'Verified False' && (
              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center space-x-1">
                <XCircle className="w-3 h-3" />
                <span>Verified False</span>
              </span>
            )}
            {status === 'Misleading' && (
              <span className="px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-300 border border-orange-500/30 text-xs font-semibold flex items-center space-x-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Misleading</span>
              </span>
            )}
          </div>

        </div>

        {/* Claim Text Body */}
        <p className="text-sm text-slate-200 line-clamp-3 leading-relaxed mb-4 font-normal">
          "{text}"
        </p>

        {/* Risk Flags Bar */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {flags.map((flag) => (
            <span
              key={flag}
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center space-x-1 ${
                flag === 'High Risk'
                  ? 'bg-rose-950 text-rose-300 border border-rose-700/80 shadow-sm'
                  : flag === 'Sensational'
                  ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60'
                  : flag === 'Shouting'
                  ? 'bg-orange-950/80 text-orange-300 border border-orange-700/60'
                  : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}
            >
              {flag === 'High Risk' && <AlertTriangle className="w-3 h-3 text-rose-400 mr-0.5" />}
              <span>{flag}</span>
            </span>
          ))}
        </div>

        {/* Reviewer Note Snippet if reviewed */}
        {reviewerNote && (
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-300 mb-4">
            <span className="font-semibold text-slate-400 block mb-0.5">Reviewer Note:</span>
            <p className="italic text-slate-300 line-clamp-2">{reviewerNote}</p>
          </div>
        )}
      </div>

      {/* Card Footer: Timestamp & Action */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-1 text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{formattedDate}</span>
        </div>

        <button
          onClick={() => onOpenDetail(claim)}
          className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg font-semibold transition"
        >
          <span>{status === 'Unverified' ? 'Triage & Review' : 'View Details'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}

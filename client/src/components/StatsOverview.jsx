import React from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export default function StatsOverview({ stats, onSelectStatusFilter }) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3 mb-6">
      
      {/* Total Claims */}
      <div 
        onClick={() => onSelectStatusFilter('All')}
        className="glass-card p-3 sm:p-4 rounded-xl cursor-pointer border border-slate-800 hover:border-slate-700 active:scale-[0.98] transition"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-slate-400 font-medium">Total Claims</span>
          <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-slate-100 mt-1 sm:mt-2">{stats.total || 0}</div>
        <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 sm:mt-1 truncate">Total triaged feed</div>
      </div>

      {/* High Risk */}
      <div 
        onClick={() => onSelectStatusFilter('High Risk')}
        className="glass-card p-3 sm:p-4 rounded-xl cursor-pointer border border-rose-900/40 bg-rose-950/20 hover:border-rose-700/60 active:scale-[0.98] transition"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-rose-400 font-semibold">High Risk</span>
          <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 animate-pulse" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-rose-300 mt-1 sm:mt-2">{stats.highRisk || 0}</div>
        <div className="text-[10px] sm:text-[11px] text-rose-400/80 mt-0.5 sm:mt-1 truncate">2+ risk flags</div>
      </div>

      {/* Unverified */}
      <div 
        onClick={() => onSelectStatusFilter('Unverified')}
        className="glass-card p-3 sm:p-4 rounded-xl cursor-pointer border border-amber-900/40 bg-amber-950/20 hover:border-amber-700/60 active:scale-[0.98] transition"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-amber-400 font-semibold">Pending Triage</span>
          <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-amber-300 mt-1 sm:mt-2">{stats.unverified || 0}</div>
        <div className="text-[10px] sm:text-[11px] text-amber-400/80 mt-0.5 sm:mt-1 truncate">Awaiting review</div>
      </div>

      {/* Verified True */}
      <div 
        onClick={() => onSelectStatusFilter('Verified True')}
        className="glass-card p-3 sm:p-4 rounded-xl cursor-pointer border border-emerald-900/40 bg-emerald-950/20 hover:border-emerald-700/60 active:scale-[0.98] transition"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-emerald-400 font-semibold">Verified True</span>
          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-emerald-300 mt-1 sm:mt-2">{stats.verifiedTrue || 0}</div>
        <div className="text-[10px] sm:text-[11px] text-emerald-400/80 mt-0.5 sm:mt-1 truncate">Confirmed factual</div>
      </div>

      {/* Verified False / Misleading */}
      <div 
        onClick={() => onSelectStatusFilter('Verified False')}
        className="glass-card p-3 sm:p-4 rounded-xl cursor-pointer border border-purple-900/40 bg-purple-950/20 hover:border-purple-700/60 active:scale-[0.98] transition col-span-2 sm:col-span-1"
      >
        <div className="flex items-center justify-between">
          <span className="text-[11px] sm:text-xs text-purple-400 font-semibold">Debunked / False</span>
          <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
        </div>
        <div className="text-xl sm:text-2xl font-bold text-purple-300 mt-1 sm:mt-2">
          {(stats.verifiedFalse || 0) + (stats.misleading || 0)}
        </div>
        <div className="text-[10px] sm:text-[11px] text-purple-400/80 mt-0.5 sm:mt-1 truncate">False / misleading</div>
      </div>

    </div>
  );
}

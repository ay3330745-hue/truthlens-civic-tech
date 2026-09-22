import React from 'react';
import { ShieldAlert, PlusCircle, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenSubmitModal, stats }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600/20 border border-blue-500/40 rounded-xl text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
                  TruthLens
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                  Civic Tech
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Misinformation Triage Platform • Track 2
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'feed'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Public Feed</span>
              {stats?.unverified > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs rounded-full">
                  {stats.unverified}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('decisions')}
              className={`flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'decisions'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>DECISIONS.md</span>
            </button>
          </nav>

          {/* Action Buttons & Hackathon Badge */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>ID: Haridwar Team 58</span>
            </div>

            <button
              onClick={onOpenSubmitModal}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Claim</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

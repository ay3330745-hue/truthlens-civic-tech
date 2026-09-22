import React from 'react';
import { ShieldAlert, PlusCircle, BookOpen, Layers } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenSubmitModal, stats }) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 glass-panel">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-2.5 sm:py-0 sm:h-16 gap-2 sm:gap-0">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center space-x-2.5">
              <div className="p-1.5 sm:p-2 bg-blue-600/20 border border-blue-500/40 rounded-xl text-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/10">
                <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-200 bg-clip-text text-transparent">
                    TruthLens
                  </span>
                  <span className="text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                    Civic Tech
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 hidden xs:block">
                  Misinformation Triage • Track 2
                </p>
              </div>
            </div>

            {/* Mobile Submit Button CTA */}
            <button
              onClick={onOpenSubmitModal}
              className="sm:hidden flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            <nav className="flex space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 w-full sm:w-auto justify-center">
              <button
                onClick={() => setActiveTab('feed')}
                className={`flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'feed'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Public Feed</span>
                {stats?.unverified > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] sm:text-xs rounded-full font-mono">
                    {stats.unverified}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('decisions')}
                className={`flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'decisions'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>DECISIONS.md</span>
              </button>
            </nav>

            {/* Desktop Action Buttons & Hackathon Badge */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="hidden lg:flex items-center space-x-1.5 text-xs text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ID: AZIS-TDD368</span>
              </div>

              <button
                onClick={onOpenSubmitModal}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Claim</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

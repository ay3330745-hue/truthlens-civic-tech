import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import ClaimFeed from './components/ClaimFeed';
import ClaimSubmission from './components/ClaimSubmission';
import ClaimDetailModal from './components/ClaimDetailModal';
import DecisionPointsView from './components/DecisionPointsView';
import { fetchClaims } from './services/api';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [claims, setClaims] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('risk'); // DP1 Default: High Risk First
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const loadClaimsFeed = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchClaims({
        category: selectedCategory,
        status: selectedStatus,
        sort: sortOrder,
        search: searchQuery
      });
      setClaims(res.data || []);
      setStats(res.stats || null);
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedStatus, sortOrder, searchQuery]);

  useEffect(() => {
    loadClaimsFeed();
  }, [loadClaimsFeed]);

  const handleClaimSubmitted = (newClaim) => {
    showToast(`Claim successfully submitted and triaged with ${newClaim.flags.length} risk flags!`);
    loadClaimsFeed();
  };

  const handleClaimReviewed = (updatedClaim) => {
    showToast(`Claim marked as ${updatedClaim.status}!`);
    loadClaimsFeed();
  };

  const handleOpenDetail = (claim) => {
    setSelectedClaim(claim);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-emerald-950 border border-emerald-700/80 text-emerald-200 text-xs font-semibold rounded-xl shadow-2xl flex items-center space-x-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <div>
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
          stats={stats}
        />

        {/* Hero & Track Intro Banner */}
        <section className="border-b border-slate-800/80 bg-gradient-to-b from-slate-900/60 to-slate-950 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-semibold">
                    Product Brief • TruthLens
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs font-mono">
                    Track 2: Real-World AI Products
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
                  A Misinformation Triage Platform
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1 leading-relaxed">
                  Social media moves faster than fact-checkers can publish. TruthLens triages viral claims neutral-by-design, checking information provenance, keywords, and shouting patterns rather than ideologies.
                </p>
              </div>

              {/* Quick Specs Badges */}
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-400">
                <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>5/5 Features</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>3/3 Decision Points</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {activeTab === 'feed' ? (
            <>
              {/* Analytics Summary Counter Cards */}
              <StatsOverview
                stats={stats}
                onSelectStatusFilter={(st) => setSelectedStatus(st)}
              />

              {/* Feed & Triage Grid */}
              <ClaimFeed
                claims={claims}
                loading={loading}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenDetail={handleOpenDetail}
              />
            </>
          ) : (
            <DecisionPointsView />
          )}

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>
          TruthLens • Built for Code2Career Hackathon (Track 2: Real-World AI Products)
        </p>
        <p className="font-mono text-slate-600">
          Team: Arjun Yadav & Dheeraj Kumar Sharma | ID: AZISTDD368 • Neutral By Design Civic Tech
        </p>
      </footer>

      {/* Modals */}
      <ClaimSubmission
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSuccess={handleClaimSubmitted}
      />

      <ClaimDetailModal
        claim={selectedClaim}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onReviewSuccess={handleClaimReviewed}
      />

    </div>
  );
}

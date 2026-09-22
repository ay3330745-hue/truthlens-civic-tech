import React from 'react';
import { Search, Filter, ArrowUpDown, AlertCircle } from 'lucide-react';
import ClaimCard from './ClaimCard';

const categories = ['All', 'Politics', 'Health', 'Finance', 'Other'];
const statusOptions = ['All', 'Unverified', 'Verified True', 'Verified False', 'Misleading', 'High Risk'];

export default function ClaimFeed({
  claims,
  loading,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  sortOrder,
  setSortOrder,
  searchQuery,
  setSearchQuery,
  onOpenDetail
}) {
  return (
    <div className="space-y-6">
      
      {/* Controls Bar: Search, Category Pills, Status Tabs, Sorting */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-4">
        
        {/* Search & Sort controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search claims by keyword..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Feed Order Dropdown (DP1 Implementation) */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <ArrowUpDown className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">Feed Order:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs font-semibold text-blue-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="risk">🔥 High Risk First (DP1 Default)</option>
              <option value="recency">⏰ Newest First</option>
              <option value="oldest">📅 Oldest First</option>
            </select>
          </div>

        </div>

        {/* Category Pills & Status Tabs */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 pt-2 border-t border-slate-800">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 font-semibold mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 font-semibold mr-1">Status:</span>
            {statusOptions.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  selectedStatus === st
                    ? st === 'High Risk'
                      ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                      : 'bg-slate-700 text-white shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Feed Grid / Loading / Empty state */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-400">Loading public claim feed...</p>
        </div>
      ) : claims.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center border border-slate-800 space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">No claims match the selected filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your category, status, or search query filter to view more triaged claims.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {claims.map((claim) => (
            <ClaimCard
              key={claim.id}
              claim={claim}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>
      )}

    </div>
  );
}

import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';

export type RoadmapTabType = 'my-roadmap' | 'recommended' | 'history' | 'create-roadmap';

interface RoadmapHeroHeaderProps {
  activeTab: RoadmapTabType;
  setActiveTab: (tab: RoadmapTabType) => void;
  onDownloadRoadmap: () => void;
}

export const RoadmapHeroHeader: React.FC<RoadmapHeroHeaderProps> = ({
  activeTab,
  setActiveTab,
  onDownloadRoadmap,
}) => {
  return (
    <>
      {/* 1. COMPACT PAGE HERO: TITLE, SUBTITLE & MONUMENT ARTWORK */}
      <div className="relative w-full bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden px-6 sm:px-8 py-5 sm:py-6">
        {/* Heritage / Rashtrapati Bhavan Panoramic Background Artwork */}
        <div className="absolute inset-y-0 right-28 sm:right-40 md:right-56 w-3/5 sm:w-1/2 md:w-2/5 pointer-events-none select-none z-0 overflow-hidden flex items-end justify-center">
          <img
            src="/asset/hero_rashtrapati_artwork.jpg"
            alt="Rashtrapati Bhavan Sovereign Architecture"
            aria-hidden="true"
            className="w-full h-full object-contain object-bottom opacity-55 mix-blend-multiply"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/asset/rashtrapati_banner_panoramic.jpg';
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Back Link, Title & Subtitle */}
          <div className="space-y-1">
            {activeTab === 'recommended' && (
              <button
                type="button"
                onClick={() => setActiveTab('my-roadmap')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0B1E48] transition-colors mb-1.5 cursor-pointer select-none"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Roadmap</span>
              </button>
            )}

            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1E48] tracking-tight">
              {activeTab === 'recommended' ? 'Recommended Roadmaps' : 'My Learning Roadmap'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {activeTab === 'recommended'
                ? 'Choose a learning path aligned with your role and goals.'
                : 'A personalized learning journey to help you achieve your role goals.'}
            </p>
          </div>

          {/* Right: Viksit Bharat Motto & Tri-color */}
          <div className="hidden md:flex flex-col items-start text-left shrink-0 pl-6 border-l border-slate-100 z-10">
            <span className="text-xs sm:text-sm font-bold text-[#0B1E48] tracking-tight leading-snug">
              &ldquo;Better Skills.<br />
              Stronger Decisions.<br />
              A Viksit Bharat.&rdquo;
            </span>
            <div className="h-1 w-16 mt-2 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] border border-slate-200 shadow-2xs" />
          </div>
        </div>
      </div>

      {/* 2. ROADMAP TABS & ACTION BAR */}
      <div className="border-b border-slate-200 flex items-center justify-between gap-4 flex-wrap">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('my-roadmap')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer select-none border-b-2 whitespace-nowrap ${
              activeTab === 'my-roadmap'
                ? 'border-[#FF6B35] text-[#0B1E48] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Roadmap
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('recommended')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer select-none border-b-2 whitespace-nowrap ${
              activeTab === 'recommended'
                ? 'border-[#FF6B35] text-[#0B1E48] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Recommended
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer select-none border-b-2 whitespace-nowrap ${
              activeTab === 'history'
                ? 'border-[#FF6B35] text-[#0B1E48] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            History
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('create-roadmap')}
            className={`pb-3 text-sm font-semibold transition-all cursor-pointer select-none border-b-2 whitespace-nowrap ${
              activeTab === 'create-roadmap'
                ? 'border-[#FF6B35] text-[#0B1E48] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Create Roadmap
          </button>
        </div>

        {/* Action: Download Roadmap (Shown on My Roadmap) */}
        {activeTab === 'my-roadmap' && (
          <button
            type="button"
            onClick={onDownloadRoadmap}
            className="mb-2 py-1.5 px-3.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-2 shadow-2xs transition-colors cursor-pointer shrink-0"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Download Roadmap</span>
          </button>
        )}
      </div>
    </>
  );
};

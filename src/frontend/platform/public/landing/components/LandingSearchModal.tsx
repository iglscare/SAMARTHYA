import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Button } from '@/shared/ui/Button';

interface LandingSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Sampling Multipliers in R',
  'CPI Imputation Rules',
  'GVA Double Deflation',
  'CAPI Telemetry Paradata',
];

export const LandingSearchModal: React.FC<LandingSearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-20 p-3 sm:p-4 animate-fade-in">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-5 sm:p-6 space-y-4 sm:space-y-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-sm">
            <Search className="h-4.5 w-4.5 text-[#0B57D0]" />
            <span>Search Samarthya Intelligence</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <input
          type="text"
          autoFocus
          placeholder="Search competencies, ISS/SSS roles, CPI formulas, or CAPI manuals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 sm:py-3.5 px-4 text-xs sm:text-sm rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B57D0] text-slate-900 font-medium"
        />

        <div className="text-xs text-slate-500 space-y-2">
          <span className="font-bold text-slate-700 block">Popular Searches:</span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {POPULAR_SEARCHES.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-[#0B57D0] text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-3 flex flex-wrap justify-end gap-2 border-t border-slate-100">
          <Button
            onClick={onClose}
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-bold"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onClose();
              navigate('/learner');
            }}
            variant="default"
            size="sm"
            className="bg-[#0B57D0] hover:bg-blue-700 text-white text-xs font-bold rounded-full px-4 sm:px-5"
          >
            Search in Learner Portal
          </Button>
        </div>
      </div>
    </div>
  );
};

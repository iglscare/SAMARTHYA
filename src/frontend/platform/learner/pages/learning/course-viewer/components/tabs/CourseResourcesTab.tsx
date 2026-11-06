import React from 'react';
import {
  FileText,
  FileDown,
  Search,
  X,
  Eye,
  Download,
  ShieldCheck,
  Code,
  Database,
  BookOpen,
} from 'lucide-react';
import { CourseResource } from '@/platform/learner/courses';

interface CourseResourcesTabProps {
  courseResources: CourseResource[];
  filteredResources: CourseResource[];
  resourceCategories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onDownloadAll: () => void;
  onPreviewResource: (res: CourseResource) => void;
  onDownloadResource: (res: CourseResource) => void;
}

export const CourseResourcesTab: React.FC<CourseResourcesTabProps> = ({
  courseResources,
  filteredResources,
  resourceCategories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onDownloadAll,
  onPreviewResource,
  onDownloadResource,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_24px_rgba(11,30,72,0.03)] p-6 sm:p-7 space-y-6 text-left animate-in fade-in">
      {/* Top Banner: Header + Download All Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-[#0B1E48]">
              Official Reference Manuals, Data Dictionaries & Scripts
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              {courseResources.length} Materials
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Verified technical publications, code notebooks, and survey schedules issued under MoSPI & NSSTA governance.
          </p>
        </div>

        <button
          type="button"
          onClick={onDownloadAll}
          className="px-4 py-2.5 rounded-xl bg-[#0B1E48] hover:bg-[#163B61] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <FileDown className="h-4 w-4" />
          <span>Download All Package</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search manuals, datasets, code..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {resourceCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#1D4ED8] text-white shadow-2xs'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {cat} {cat === 'All' && `(${courseResources.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Resources List */}
      {filteredResources.length === 0 ? (
        <div className="py-12 text-center text-slate-400 space-y-2">
          <FileText className="h-8 w-8 mx-auto opacity-40" />
          <p className="text-sm font-medium">No resources found matching your filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredResources.map((res) => {
            const isPdf = res.type === 'pdf' || res.format === 'PDF';
            const isCode = res.type === 'code' || res.format === 'PY' || res.format === 'IPYNB';
            const isDataset =
              res.type === 'dataset' ||
              res.format === 'CSV' ||
              res.format === 'GEOJSON' ||
              res.format === 'XLSX';

            return (
              <div
                key={res.id}
                className="p-4 rounded-xl border border-slate-200/90 hover:border-blue-300 hover:shadow-xs bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Icon, Category Badge, Title, Description */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isPdf
                        ? 'bg-red-50 text-red-600 border border-red-100'
                        : isCode
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : isDataset
                        ? 'bg-blue-50 text-blue-600 border border-blue-100'
                        : 'bg-purple-50 text-purple-600 border border-purple-100'
                    }`}
                  >
                    {res.category === 'Statutory Guide' || res.category === 'Gazette' ? (
                      <ShieldCheck className="h-5 w-5 text-amber-600" />
                    ) : isPdf ? (
                      <FileText className="h-5 w-5" />
                    ) : isCode ? (
                      <Code className="h-5 w-5" />
                    ) : isDataset ? (
                      <Database className="h-5 w-5" />
                    ) : (
                      <BookOpen className="h-5 w-5" />
                    )}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {res.category || 'Official Guide'}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isPdf
                            ? 'bg-red-50 text-red-700'
                            : isCode
                            ? 'bg-emerald-50 text-emerald-700'
                            : isDataset
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-purple-50 text-purple-700'
                        }`}
                      >
                        {res.format || res.type.toUpperCase()}
                      </span>
                      {res.size && (
                        <span className="text-[11px] font-mono text-slate-400">
                          {res.size}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-[#0B1E48] leading-snug">
                      {res.title}
                    </h4>

                    {res.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {res.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <button
                    type="button"
                    onClick={() => onPreviewResource(res)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Preview Document Details"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDownloadResource(res)}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-[#1D4ED8] text-[#1D4ED8] hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                    title="Download Material"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

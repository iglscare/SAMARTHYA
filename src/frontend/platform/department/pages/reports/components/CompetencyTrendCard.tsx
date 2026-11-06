import React from 'react';

export const CompetencyTrendCard: React.FC = () => {
  return (
    <div className="lg:col-span-4.5 xl:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0B1E48]">Competency Trend</h3>
            <p className="text-[11px] text-slate-400 font-medium">Average competency level over time</p>
          </div>

          {/* Legend */}
          <div className="flex items-center space-x-3 text-[11px] font-medium text-slate-500">
            <div className="flex items-center space-x-1">
              <span className="h-2 w-2 rounded-full bg-[#0B57D0]" />
              <span>Department</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="h-0.5 w-3 border-b-2 border-dashed border-slate-300" />
              <span>Target</span>
            </div>
          </div>
        </div>

        {/* SVG Trend Chart */}
        <div className="relative mt-4 h-48 w-full">
          {/* Target 72% +6% Callout pill */}
          <div className="absolute right-4 top-5 bg-white border border-blue-200 rounded-lg px-2 py-0.5 shadow-sm z-10 text-center">
            <div className="text-xs font-black text-[#0B1E48] leading-tight">72%</div>
            <div className="text-[9.5px] font-bold text-emerald-600 leading-tight">+6%</div>
          </div>

          <svg className="w-full h-40 overflow-visible" viewBox="0 0 400 160">
            <defs>
              <linearGradient id="blueAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B57D0" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0B57D0" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Y-Axis Grid Lines */}
            <line x1="30" y1="10" x2="390" y2="10" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="30" y1="45" x2="390" y2="45" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="30" y1="80" x2="390" y2="80" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="30" y1="115" x2="390" y2="115" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="30" y1="150" x2="390" y2="150" stroke="#E2E8F0" strokeWidth="1" />

            {/* Y Labels */}
            <text x="5" y="14" fontSize="9" fill="#94A3B8">100%</text>
            <text x="8" y="49" fontSize="9" fill="#94A3B8">75%</text>
            <text x="8" y="84" fontSize="9" fill="#94A3B8">50%</text>
            <text x="8" y="119" fontSize="9" fill="#94A3B8">25%</text>
            <text x="14" y="154" fontSize="9" fill="#94A3B8">0%</text>

            {/* Dashed Target Line */}
            <path
              d="M 40 85 L 110 78 L 180 72 L 250 67 L 320 63 L 380 58"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Blue Gradient Area */}
            <path
              d="M 40 100 L 110 90 L 180 84 L 250 74 L 320 68 L 380 60 L 380 150 L 40 150 Z"
              fill="url(#blueAreaGrad)"
            />

            {/* Solid Department Progress Line */}
            <path
              d="M 40 100 L 110 90 L 180 84 L 250 74 L 320 68 L 380 60"
              fill="none"
              stroke="#0B57D0"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Data Points */}
            {[
              { cx: 40, cy: 100 },
              { cx: 110, cy: 90 },
              { cx: 180, cy: 84 },
              { cx: 250, cy: 74 },
              { cx: 320, cy: 68 },
              { cx: 380, cy: 60 },
            ].map((pt, i) => (
              <circle
                key={i}
                cx={pt.cx}
                cy={pt.cy}
                r="3.5"
                fill="#0B57D0"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* X Labels */}
          <div className="flex justify-between pl-8 pr-2 pt-1 text-[10px] text-slate-400 font-medium">
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
          </div>
        </div>
      </div>
    </div>
  );
};

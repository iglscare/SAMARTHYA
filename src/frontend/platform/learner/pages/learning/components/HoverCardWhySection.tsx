import React from 'react';
import { BarChart2, ShieldCheck, Lock } from 'lucide-react';
import { WhyRecommendedItem } from './hoverCard.types';

interface HoverCardWhySectionProps {
  whyCards: WhyRecommendedItem[];
}

export const HoverCardWhySection: React.FC<HoverCardWhySectionProps> = ({ whyCards }) => {
  return (
    <div className="mt-2.5">
      <h5 className="text-[11px] font-bold text-[#0B1E48] mb-1.5 tracking-tight">Why Recommended?</h5>
      <div className="grid grid-cols-3 gap-1.5">
        {whyCards.map((card, idx) => (
          <div key={idx} className="rounded-xl border border-slate-100 bg-white p-2 text-left shadow-2xs flex flex-col justify-between">
            <div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mb-1.5 ${
                  card.type === 'gap'
                    ? 'bg-[#FFF5EB] text-[#F97316]'
                    : card.type === 'mandate'
                    ? 'bg-[#EFF6FF] text-[#2563EB]'
                    : 'bg-[#FAF5FF] text-[#A855F7]'
                }`}
              >
                {card.type === 'gap' && <BarChart2 className="w-3 h-3 stroke-[2.2]" />}
                {card.type === 'mandate' && <ShieldCheck className="w-3 h-3 stroke-[2.2]" />}
                {card.type === 'milestone' && <Lock className="w-3 h-3 stroke-[2.2]" />}
              </div>
              <div className="text-[9.5px] font-bold text-[#0B1E48] leading-tight">{card.title}</div>
              <p className="text-[8.5px] text-slate-500 font-normal mt-0.5 leading-tight line-clamp-2">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

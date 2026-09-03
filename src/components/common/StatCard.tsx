import React, { useEffect, useRef } from 'react';
import { animateCount } from '@/lib/anime';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'primary' | 'saffron' | 'emerald' | 'destructive';
  badgeText?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  suffix = '',
  subtitle,
  icon: Icon,
  color = 'primary',
  badgeText,
}) => {
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    animateCount(numberRef.current, value, 900, suffix);
  }, [value, suffix]);

  const colorStyles = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    saffron: 'bg-saffron-100 text-saffron-700 dark:bg-saffron-950/50 dark:text-saffron-400 border-saffron-300 dark:border-saffron-800',
    emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800',
    destructive: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400 border-red-300 dark:border-red-800',
  };

  return (
    <div className="rounded-3xl bg-white shadow-lg border border-slate-200/90 p-5 sm:p-6 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        <div className={`p-2.5 rounded-xl border ${colorStyles[color]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline space-x-2">
        <span
          ref={numberRef}
          className="text-3xl font-black text-[#0B1E48] tracking-tight"
        >
          {value}{suffix}
        </span>
        {badgeText && (
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0B57D0] border border-blue-200">
            {badgeText}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

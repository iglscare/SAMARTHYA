import React from 'react';
import { MOCK_TEAM_MEMBERS } from '@/services/mock/departmentAnalytics.mock';
import { MOCK_COMPETENCIES } from '@/services/mock/competencies.mock';

export const TeamHeatmap: React.FC = () => {
  const getLevelColor = (level: number) => {
    switch (level) {
      case 5:
        return 'bg-emerald-600 text-white';
      case 4:
        return 'bg-emerald-500 text-white';
      case 3:
        return 'bg-sky-500 text-white';
      case 2:
        return 'bg-amber-500 text-white';
      case 1:
      default:
        return 'bg-red-500/80 text-white';
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground md:hidden px-1">
        <span>Scroll horizontally to view all competencies &rarr;</span>
      </div>

      <div className="w-full overflow-x-auto rounded-xl border border-border/80">
        <table className="w-full text-xs text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-3 font-bold text-foreground sticky left-0 bg-muted/90 backdrop-blur-xs z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] min-w-[170px]">
                Officer Name & Cadre
              </th>
              <th className="p-3 font-semibold text-foreground text-center min-w-[80px]">
                Readiness
              </th>
              {MOCK_COMPETENCIES.map((c) => (
                <th
                  key={c.id}
                  className="p-3 font-semibold text-foreground text-center max-w-[100px] truncate"
                  title={c.name}
                >
                  {c.name.split(' ')[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {MOCK_TEAM_MEMBERS.map((member) => (
              <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-3 sticky left-0 bg-card z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  <div className="font-semibold text-foreground truncate max-w-[160px] sm:max-w-none">
                    {member.name}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground truncate max-w-[160px] sm:max-w-none">
                    {member.designation} • {member.cadre.split('(')[0].trim()}
                  </div>
                </td>
                <td className="p-3 text-center whitespace-nowrap">
                  <span
                    className={`inline-block font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                      member.readinessScore >= 80
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : member.readinessScore >= 65
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                    }`}
                  >
                    {member.readinessScore}%
                  </span>
                </td>
                {MOCK_COMPETENCIES.map((c) => {
                  const lvl = member.competencyLevels[c.id] || 1;
                  return (
                    <td key={c.id} className="p-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-md font-bold text-xs shadow-xs ${getLevelColor(
                          lvl
                        )}`}
                      >
                        L{lvl}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

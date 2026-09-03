import React from 'react';
import { useCompetencyStore } from '@/store/useCompetencyStore';
import { useTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/Button';
import { Check, AlertCircle, RefreshCw } from 'lucide-react';

export const CompetencyProfilePage: React.FC = () => {
  const {
    competencies,
    targetRoles,
    activeTargetRoleId,
    setTargetRole,
    ratings,
    resetProgress
  } = useCompetencyStore();
  const { t } = useTranslation();

  const activeRole = targetRoles.find((r) => r.id === activeTargetRoleId) || targetRoles[0];

  return (
    <div className="space-y-6">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0B1E48]">
            {t('competency.title', 'Official Competency Profile & Taxonomy')}
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
            {t('competency.subtitle', 'Structured against the Indian Statistical Ecosystem Competency Matrix (Levels 1–5).')}
          </p>
        </div>

        {/* Reset Demo Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={resetProgress}
          className="text-xs font-bold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 rounded-xl px-3.5 py-2 shadow-2xs flex items-center space-x-1.5 cursor-pointer"
          title="Reset back to initial baseline for testing"
        >
          <RefreshCw className="h-3.5 w-3.5 text-[#0B57D0]" />
          <span>{t('competency.reset', 'Reset Demo Progress')}</span>
        </Button>
      </div>

      {/* Target Role Selector Banner */}
      <div className="bg-white rounded-3xl shadow-lg border border-slate-200/90 p-6 sm:p-7 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 text-[#0B57D0] border border-blue-200/80">
                {t('competency.activeBenchmark', 'Active Career Benchmark')}
              </span>
              <span className="text-xs font-bold text-[#FA8C16] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/70">
                {activeRole.cadre} {t('competency.cadre', 'Cadre')}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight">
              {activeRole.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeRole.description}
            </p>
          </div>

          {/* Target Role Switcher Pills */}
          <div className="flex flex-col gap-2 shrink-0">
            <span className="text-xs font-bold text-slate-500">{t('competency.switchRole', 'Switch Target Role:')}</span>
            <div className="flex flex-wrap gap-2">
              {targetRoles.map((role) => {
                const isActive = role.id === activeTargetRoleId;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setTargetRole(role.id)}
                    className={`text-xs font-bold py-2 px-3.5 rounded-xl transition-all cursor-pointer shadow-2xs ${
                      isActive
                        ? 'bg-[#0B1E48] text-white shadow-md'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                    }`}
                  >
                    {role.cadre}: {role.title.split('(')[0].trim()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Competency Domains Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {competencies.map((comp) => {
          const rating = ratings[comp.id] || { currentLevel: 1, targetLevel: 3, verifiedLevel: 1 };
          const requirement = activeRole.competencyRequirements.find((r) => r.competencyId === comp.id);
          const targetLevel = requirement ? requirement.targetLevel : rating.targetLevel;
          const isSatisfied = rating.currentLevel >= targetLevel;

          return (
            <div
              key={comp.id}
              className="bg-white rounded-3xl shadow-lg border border-slate-200/90 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-blue-50 text-[#0B57D0] border border-blue-200/80">
                    {comp.code}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-slate-500">{t('competency.current', 'Current:')}</span>
                    <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-lg bg-[#0B1E48] text-white font-black text-xs shadow-xs">
                      L{rating.currentLevel}
                    </span>
                    <span className="text-xs font-bold text-slate-400">→</span>
                    <span className="text-xs font-bold text-slate-500">{t('competency.target', 'Target:')}</span>
                    <span className="inline-flex items-center justify-center h-6 px-2.5 rounded-lg bg-[#FA8C16] text-white font-black text-xs shadow-xs">
                      L{targetLevel}
                    </span>
                  </div>
                </div>
                <h4 className="text-lg font-black text-[#0B1E48] leading-snug">
                  {comp.name}
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {t('competency.domain', 'Domain:')} <span className="font-bold text-slate-800">{comp.domain}</span>
                </p>
              </div>

              <div className="p-6 space-y-4 flex-1">
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                  {comp.description}
                </p>

                {/* Level Criteria Progression */}
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    {t('competency.levelsTitle', 'Proficiency Levels:')}
                  </p>
                  <div className="space-y-2">
                    {comp.levels.map((lvl) => {
                      const isCurrent = lvl.level === rating.currentLevel;
                      const isTarget = lvl.level === targetLevel;

                      return (
                        <div
                          key={lvl.level}
                          className={`p-3 rounded-2xl border text-xs transition-all ${
                            isCurrent
                              ? 'border-blue-300 bg-blue-50/80 font-medium text-slate-900 shadow-2xs'
                              : isTarget
                              ? 'border-amber-300 bg-amber-50/70 font-medium text-slate-900 shadow-2xs'
                              : 'border-slate-200/70 bg-slate-50/40 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold flex items-center space-x-1.5 text-slate-800">
                              <span>{t('common.level', 'Level')} {lvl.level}: {lvl.title}</span>
                            </span>
                            <div className="flex space-x-1.5">
                              {isCurrent && (
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#0B1E48] text-white shadow-2xs">
                                  {t('competency.currentBadge', 'Current')} (L{lvl.level})
                                </span>
                              )}
                              {isTarget && (
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#FA8C16] text-white shadow-2xs">
                                  {t('competency.targetBadge', 'Target Goal')}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                            {lvl.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  {isSatisfied ? (
                    <div className="flex items-center space-x-1.5 text-emerald-700 font-bold">
                      <Check className="h-4.5 w-4.5 text-emerald-600 stroke-[3]" />
                      <span>{t('competency.satisfied', 'Target Requirement Satisfied')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1.5 text-rose-600 font-bold">
                      <AlertCircle className="h-4 w-4 text-rose-500" />
                      <span>{t('competency.deficit', 'Deficit:')} {targetLevel - rating.currentLevel} {t('competency.levelsToClose', 'Level(s) to close')}</span>
                    </div>
                  )}
                </div>

                <span className="text-[11px] font-bold font-mono text-slate-600 bg-white border border-slate-200/90 px-2.5 py-1 rounded-lg shadow-2xs">
                  {t('competency.weight', 'Weight:')} {comp.criticalityWeight}x
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

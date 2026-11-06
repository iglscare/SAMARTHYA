import React from 'react';
import { getQuickActions } from './constants';

interface ChatbotQuickActionsProps {
  locale: string;
  onSelectAction: (prompt: string) => void;
}

export const ChatbotQuickActions: React.FC<ChatbotQuickActionsProps> = ({
  locale,
  onSelectAction,
}) => {
  const quickActions = getQuickActions(locale);

  return (
    <div className="px-4 py-2 bg-white">
      <div className="grid grid-cols-2 gap-2.5">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              type="button"
              onClick={() => onSelectAction(action.prompt)}
              className="w-full bg-white hover:bg-blue-50/50 border border-slate-200/90 hover:border-[#0B57D0]/40 rounded-2xl p-2.5 sm:p-3 flex items-center space-x-2.5 text-left shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0B57D0] shrink-0 stroke-[2] group-hover:scale-110 transition-transform" />
              <span className="text-[11px] sm:text-xs font-bold text-[#0B1E48] group-hover:text-[#0B57D0] line-clamp-1 leading-tight">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

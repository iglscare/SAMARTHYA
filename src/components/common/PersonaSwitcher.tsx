import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { UserRole } from '@/types/domain';
import { UserCheck, Shield, Award, Users, ChevronUp, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const PersonaSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentRole, currentUser, switchRole } = useAuthStore();
  const navigate = useNavigate();

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setIsOpen(false);
    navigate(`/${role}`);
  };

  const personas: { role: UserRole; title: string; subtitle: string; icon: any; color: string }[] = [
    {
      role: 'learner',
      title: 'Rajesh Kumar (SSS)',
      subtitle: 'Learner • NSSO Statistical Officer',
      icon: Award,
      color: 'bg-primary text-primary-foreground',
    },
    {
      role: 'department',
      title: 'Dr. Rajesh Verma (ISS)',
      subtitle: 'Department Head • DDG FOD',
      icon: Users,
      color: 'bg-saffron-600 text-white',
    },
    {
      role: 'admin',
      title: 'Anand Swaminathan (ISS)',
      subtitle: 'System Admin • Chief Training Officer',
      icon: Shield,
      color: 'bg-emerald-600 text-white',
    },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Expanded Persona Menu */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl border bg-card p-3 shadow-2xl animate-fade-in border-primary/20 backdrop-blur-md">
          <div className="flex items-center justify-between pb-2 mb-2 border-b">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary font-display">
                SIH Evaluator Sandbox
              </p>
              <p className="text-[11px] text-muted-foreground">
                Switch user persona instantly
              </p>
            </div>
            <Badge variant="saffron" className="text-[10px]">
              Prototype Demo
            </Badge>
          </div>

          <div className="space-y-1.5">
            {personas.map((p) => {
              const Icon = p.icon;
              const isSelected = currentRole === p.role;
              return (
                <button
                  key={p.role}
                  onClick={() => handleRoleChange(p.role)}
                  className={`w-full flex items-center space-x-3 p-2.5 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-primary/10 border border-primary/30 font-medium'
                      : 'hover:bg-muted/60 border border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${p.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {p.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {p.subtitle}
                    </p>
                  </div>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="default"
        size="sm"
        className="rounded-full shadow-lg h-11 px-4 flex items-center space-x-2 border border-white/20 bg-primary/95 backdrop-blur-md hover:scale-105 transition-transform"
      >
        <UserCheck className="h-4 w-4 text-accent" />
        <span className="text-xs font-semibold">
          Role: <span className="capitalize">{currentRole}</span> ({currentUser.name.split(' ')[0]})
        </span>
        {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
      </Button>
    </div>
  );
};

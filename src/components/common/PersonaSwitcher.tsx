import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { useTranslation } from '@/lib/i18n';
import { UserRole } from '@/types/domain';
import { UserCheck, Shield, Award, Users, ChevronUp, ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const PersonaSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentRole, switchRole } = useAuthStore();
  const { locale } = useTranslation();
  const navigate = useNavigate();

  const handleRoleChange = (role: UserRole) => {
    switchRole(role);
    setIsOpen(false);
    navigate(`/${role}`);
  };

  const personas: { role: UserRole; title: string; subtitle: string; icon: any; color: string }[] = [
    {
      role: 'learner',
      title: locale === 'hi' ? 'राजेश कुमार (SSS)' : 'Rajesh Kumar (SSS)',
      subtitle: locale === 'hi' ? 'शिक्षार्थी • एनएसएसओ सांख्यिकी अधिकारी' : 'Learner • NSSO Statistical Officer',
      icon: Award,
      color: 'bg-primary text-primary-foreground',
    },
    {
      role: 'department',
      title: locale === 'hi' ? 'डॉ. राजेश वर्मा (ISS)' : 'Dr. Rajesh Verma (ISS)',
      subtitle: locale === 'hi' ? 'विभागाध्यक्ष • डीडीजी एफओडी' : 'Department Head • DDG FOD',
      icon: Users,
      color: 'bg-saffron-600 text-white',
    },
    {
      role: 'admin',
      title: locale === 'hi' ? 'आनंद स्वामीनाथन (ISS)' : 'Anand Swaminathan (ISS)',
      subtitle: locale === 'hi' ? 'सिस्टम एडमिन • मुख्य प्रशिक्षण अधिकारी' : 'System Admin • Chief Training Officer',
      icon: Shield,
      color: 'bg-emerald-600 text-white',
    },
  ];

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40">
      {/* Expanded Persona Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-2xs sm:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-50 mb-2 w-[calc(100vw-1.5rem)] max-w-xs sm:w-80 rounded-2xl border bg-card/95 p-3 shadow-2xl animate-fade-in border-primary/20 backdrop-blur-md">
            <div className="flex items-center justify-between pb-2 mb-2 border-b">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary font-display">
                  {locale === 'hi' ? 'एसआईएच मूल्यांकन सैंडबॉक्स' : 'SIH Evaluator Sandbox'}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {locale === 'hi' ? 'उपयोगकर्ता व्यक्तित्व तुरंत बदलें' : 'Switch user persona instantly'}
                </p>
              </div>
              <Badge variant="saffron" className="text-[10px]">
                {locale === 'hi' ? 'प्रोटोटाइप डेमो' : 'Prototype Demo'}
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
                    className={`w-full flex items-center space-x-3 p-2 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary/10 border border-primary/30 font-medium'
                        : 'hover:bg-muted/60 border border-transparent'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${p.color}`}>
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
                      <span className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Floating Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="default"
        size="sm"
        className="rounded-full shadow-md h-9 sm:h-10 px-4 flex items-center space-x-2 bg-[#0F56A4] hover:bg-[#0A4585] text-white text-xs font-semibold cursor-pointer border border-blue-400/30"
      >
        <UserCheck className="h-3.5 w-3.5 shrink-0" />
        <span>{locale === 'hi' ? 'भूमिका: ' : 'Role: '}<span className="capitalize">{currentRole}</span></span>
        {isOpen ? <ChevronDown className="h-3 w-3 shrink-0" /> : <ChevronUp className="h-3 w-3 shrink-0" />}
      </Button>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import {
  LandingHeader,
  LandingMobileNav,
  LandingHero,
  LandingActionPillars,
  LandingVision,
  LandingPartners,
  LandingSearchModal,
  LandingFooter,
} from './components';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuthStore();

  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const handlePortalLaunch = (role: 'learner' | 'department' | 'admin') => {
    switchRole(role);
    navigate(`/${role}`);
  };

  const scrollToExplore = () => {
    const el = document.getElementById('action-pillars');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden antialiased">
      {/* Floating Light Capsule Header */}
      <LandingHeader
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
      />

      {/* Mobile Navigation Drawer */}
      <LandingMobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Hero Section with Sovereign Artwork & Stats Bar */}
      <LandingHero onExploreClick={scrollToExplore} />

      {/* Core Action Pillars */}
      <LandingActionPillars onLearnClick={() => handlePortalLaunch('learner')} />

      {/* Our Vision Banner */}
      <LandingVision />

      {/* Our Partners Section */}
      <LandingPartners />

      {/* Search Modal Dialog */}
      <LandingSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      {/* Official Government Footer */}
      <LandingFooter />
    </div>
  );
};

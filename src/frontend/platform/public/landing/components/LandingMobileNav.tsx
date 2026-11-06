import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface LandingMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LandingMobileNav: React.FC<LandingMobileNavProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-white shadow-2xl flex flex-col overflow-y-auto lg:hidden animate-slide-left p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <img
            src="/asset/samarthya logo.png"
            alt="Samarthya"
            className="h-10 w-auto object-contain mix-blend-multiply"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-1 text-sm font-bold text-slate-800">
          <a
            href="#about"
            onClick={onClose}
            className="block px-3.5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            About Us
          </a>
          <a
            href="#updates"
            onClick={onClose}
            className="block px-3.5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Updates & Notifications
          </a>
          <a
            href="#tenders"
            onClick={onClose}
            className="block px-3.5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Tenders & Procurements
          </a>
          <a
            href="#help"
            onClick={onClose}
            className="block px-3.5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Help Centre
          </a>
          <a
            href="#action-pillars"
            onClick={onClose}
            className="block px-3.5 py-2.5 rounded-xl text-[#0B57D0] bg-blue-50 font-black"
          >
            Explore Platform
          </a>
        </div>

        <div className="pt-4 border-t border-slate-200 space-y-2">
          <button
            onClick={() => {
              onClose();
              navigate('/login');
            }}
            className="w-full py-3 rounded-full border-2 border-[#0B57D0] text-[#0B57D0] font-bold text-sm text-center cursor-pointer"
          >
            Log In
          </button>
          <button
            onClick={() => {
              onClose();
              navigate('/register');
            }}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#FA9A26] to-[#F88B09] text-white font-bold text-sm text-center shadow-md cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
};

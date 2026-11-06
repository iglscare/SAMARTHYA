import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const LandingFooter: React.FC = () => {
  const [subscribeEmail, setSubscribeEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setSubscribeEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="mt-auto bg-[#F4F8FD] text-slate-700 border-t border-slate-200/90 pt-12 sm:pt-14 pb-8 sm:pb-10 text-xs relative overflow-hidden">
      {/* Light Color Shade Background Image */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/asset/footer_bg_light.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-45 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-[#F4F8FD]/70" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Top 5-Column Navigation Section */}
        <div className="flex flex-wrap lg:flex-nowrap items-start justify-between gap-y-8 gap-x-6 pb-8">
          {/* Column 1: Brand, Logos & Core Mission */}
          <div className="w-full sm:w-[320px] lg:w-[280px] xl:w-[320px] shrink-0 space-y-3.5">
            <div className="flex items-center space-x-3.5">
              <img
                src="/asset/samarthya logo.png"
                alt="SAMARTHYA (सामर्थ्य) Official Logo"
                className="h-12 sm:h-14 w-auto object-contain mix-blend-multiply"
              />
              <div className="h-9 w-px bg-slate-300/80" />
              <img
                src="/asset/mospi_official_logo.png"
                alt="Government of India - MoSPI Official Emblem"
                className="h-11 sm:h-12 w-auto object-contain"
              />
            </div>

            <div className="space-y-1 pt-1">
              <h3 className="text-xl sm:text-[22px] font-extrabold text-[#0B1E48] tracking-tight leading-[1.25]">
                Skilled People. Stronger Data.<br />
                A Brighter India.
              </h3>

              {/* Sovereign Tricolor Accent Line */}
              <div className="flex h-1 w-11 rounded-full overflow-hidden my-3">
                <div className="w-1/3 bg-[#FF9933]" />
                <div className="w-1/3 bg-white border-y border-slate-200" />
                <div className="w-1/3 bg-[#138808]" />
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-[310px]">
                A unified learning platform to build the capabilities of India's statistical workforce for evidence-based governance and a better tomorrow.
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="w-[45%] sm:w-auto shrink-0 min-w-[120px]">
            <h4 className="text-sm font-bold text-[#0B1E48] mb-3.5">Quick Links</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><Link to="/" className="hover:text-[#0B57D0] transition-colors">Home</Link></li>
              <li><a href="#about" className="hover:text-[#0B57D0] transition-colors">About Us</a></li>
              <li><Link to="/learner" className="hover:text-[#0B57D0] transition-colors">Learning</Link></li>
              <li><Link to="/learner/assessments" className="hover:text-[#0B57D0] transition-colors">Assessments</Link></li>
              <li><Link to="/learner/practice" className="hover:text-[#0B57D0] transition-colors">Practice</Link></li>
              <li><a href="#updates" className="hover:text-[#0B57D0] transition-colors">Updates</a></li>
              <li><a href="#tenders" className="hover:text-[#0B57D0] transition-colors">Tenders</a></li>
              <li><a href="#help" className="hover:text-[#0B57D0] transition-colors">Help Centre</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="w-[45%] sm:w-auto shrink-0 min-w-[130px]">
            <h4 className="text-sm font-bold text-[#0B1E48] mb-3.5">Resources</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><a href="#guides" className="hover:text-[#0B57D0] transition-colors">User Guides</a></li>
              <li><a href="#faqs" className="hover:text-[#0B57D0] transition-colors">FAQs</a></li>
              <li><a href="#policy" className="hover:text-[#0B57D0] transition-colors">Policy & Guidelines</a></li>
              <li><a href="#calendar" className="hover:text-[#0B57D0] transition-colors">Training Calendar</a></li>
              <li><a href="https://mospi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#0B57D0] transition-colors">Official Websites</a></li>
              <li><a href="#downloads" className="hover:text-[#0B57D0] transition-colors">Downloads</a></li>
              <li><a href="#contact" className="hover:text-[#0B57D0] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="w-[45%] sm:w-auto shrink-0 min-w-[125px]">
            <h4 className="text-sm font-bold text-[#0B1E48] mb-3.5">Legal</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li><a href="#terms" className="hover:text-[#0B57D0] transition-colors">Terms of Use</a></li>
              <li><a href="#privacy" className="hover:text-[#0B57D0] transition-colors">Privacy Policy</a></li>
              <li><a href="#copyright" className="hover:text-[#0B57D0] transition-colors">Copyright Policy</a></li>
              <li><a href="#hyperlinking" className="hover:text-[#0B57D0] transition-colors">Hyperlinking Policy</a></li>
              <li><a href="#accessibility" className="hover:text-[#0B57D0] transition-colors">Accessibility Statement</a></li>
              <li><a href="#sitemap" className="hover:text-[#0B57D0] transition-colors">Sitemap</a></li>
            </ul>
          </div>

          {/* Column 5: Get Latest Updates */}
          <div className="w-full sm:w-auto lg:w-[320px] xl:w-[350px] shrink-0 space-y-2">
            <h4 className="text-sm font-bold text-[#0B1E48] mb-1">Get Latest Updates</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Stay informed about new courses, assessments and important announcements.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1.5">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 min-w-[180px] sm:min-w-[210px] px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B57D0] text-slate-900 font-medium shadow-2xs"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F57C00] hover:bg-[#E66E00] text-white text-xs font-bold rounded-lg shadow-2xs hover:shadow transition-all shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
              {isSubscribed && (
                <p className="text-[11px] font-bold text-emerald-600 mt-1.5 animate-fade-in">
                  ✓ Thank you for subscribing!
                </p>
              )}
              <p className="text-[11px] text-slate-400 font-medium mt-2 leading-tight">
                We respect your privacy. No spam, only important updates.
              </p>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';

export const LandingPartners: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-slate-200/80" id="partners">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-[#0B1E48] tracking-tight font-display">
            Our Partners
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            In collaboration with leading government platforms and institutions.
          </p>
        </div>

        {/* Partner Logos Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-nowrap md:items-center md:justify-between gap-6 sm:gap-8 pt-2">
          {/* 1. iGOT */}
          <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
            <img
              src="/asset/partner_crop_igot.png"
              alt="iGOT - Integrated Government Online Training"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* 2. DIKSHA */}
          <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
            <img
              src="/asset/partner_crop_diksha.png"
              alt="DIKSHA"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* 3. NIC */}
          <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
            <img
              src="/asset/partner_crop_nic.png"
              alt="NIC - National Informatics Centre"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* 4. MyGov */}
          <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
            <img
              src="/asset/partner_crop_mygov.png"
              alt="MyGov - मेरी सरकार"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* 5. Digital India */}
          <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
            <img
              src="/asset/partner_crop_digital_india.png"
              alt="Digital India - Power To Empower"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* 6. Viksit Bharat */}
          <div className="flex items-center justify-center p-2 rounded-xl hover:bg-slate-50 transition-all group">
            <img
              src="/asset/partner_crop_viksit_bharat.png"
              alt="भारत - Viksit Bharat"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

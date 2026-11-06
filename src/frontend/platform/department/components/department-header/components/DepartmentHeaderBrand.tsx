import React from 'react';
import { Link } from 'react-router-dom';

export const DepartmentHeaderBrand: React.FC = () => {
  return (
    <div className="flex items-center shrink-0">
      <Link to="/department" className="flex items-center space-x-3 group">
        <img
          src="/asset/samarthya logo.png"
          alt="SAMARTHYA (सामर्थ्य)"
          className="h-10 sm:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
        />
      </Link>
    </div>
  );
};

import React from 'react';
import {
  Camera,
  Edit3,
  CreditCard,
  Landmark,
  MapPin,
  Briefcase,
  Check,
} from 'lucide-react';
import { OfficerProfileData, ProfileTabType } from '../types';
import { TAB_ITEMS } from '../constants';

interface OfficerProfileHeaderCardProps {
  profileData: OfficerProfileData;
  onEditPhoto: () => void;
  onEditProfile: () => void;
  onCopy: (text: string, fieldName: string) => void;
  copiedField: string | null;
  activeTab: ProfileTabType;
  onSelectTab: (tab: ProfileTabType) => void;
}

export const OfficerProfileHeaderCard: React.FC<OfficerProfileHeaderCardProps> = ({
  profileData,
  onEditPhoto,
  onEditProfile,
  onCopy,
  copiedField,
  activeTab,
  onSelectTab,
}) => {
  return (
    <div className="container-3d w-full rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
      {/* Officer Bio Card Upper Body */}
      <div className="p-5 sm:p-6 lg:p-7">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left: Avatar with Edit Photo */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-5 w-full lg:w-auto">
            <div className="flex flex-col items-center shrink-0">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md">
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={onEditPhoto}
                className="mt-2.5 flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xs cursor-pointer transition-colors"
              >
                <Camera className="h-3.5 w-3.5 text-slate-500" />
                <span>Edit Photo</span>
              </button>
            </div>

            {/* Identity & Cadre Details */}
            <div className="space-y-1 text-center sm:text-left min-w-0">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {profileData.name}
              </h2>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {profileData.designation}
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {profileData.department}
              </p>
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                {profileData.ministry}
              </p>

              {/* Metadata Row: Employee ID, Cadre, Location, Experience */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800">
                {/* Employee ID */}
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-500">
                    <CreditCard className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Employee ID
                    </p>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                      {profileData.employeeId}
                    </p>
                  </div>
                </div>

                {/* Cadre */}
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-500">
                    <Landmark className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Cadre
                    </p>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                      {profileData.cadre}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                      {profileData.location}
                    </p>
                  </div>
                </div>

                {/* Years of Experience */}
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-slate-500">
                    <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Years of Experience
                    </p>
                    <p className="text-xs font-black text-slate-800 dark:text-slate-200">
                      {profileData.yearsOfExperience}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions & Official Contact Details */}
          <div className="flex flex-col sm:items-end w-full lg:w-auto space-y-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
            {/* Action Buttons: Status Badge + Edit Profile */}
            <div className="flex items-center justify-start sm:justify-end gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-black">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>

              <button
                type="button"
                onClick={onEditProfile}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              >
                <Edit3 className="h-3.5 w-3.5 text-slate-500" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Official Contact Metadata */}
            <div className="space-y-1.5 text-left sm:text-right text-xs">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Official Email
                </p>
                <button
                  type="button"
                  onClick={() => onCopy(profileData.email, 'email')}
                  className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors flex items-center sm:justify-end gap-1 cursor-pointer"
                  title="Copy Email"
                >
                  <span>{profileData.email}</span>
                  {copiedField === 'email' && <Check className="h-3 w-3 text-emerald-600" />}
                </button>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Phone (Official)
                </p>
                <button
                  type="button"
                  onClick={() => onCopy(profileData.phone, 'phone')}
                  className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors flex items-center sm:justify-end gap-1 cursor-pointer"
                  title="Copy Phone"
                >
                  <span>{profileData.phone}</span>
                  {copiedField === 'phone' && <Check className="h-3 w-3 text-emerald-600" />}
                </button>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Date of Joining
                </p>
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  {profileData.dateOfJoining}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <div className="border-t border-slate-200/80 dark:border-slate-800 px-5 sm:px-6 bg-slate-50/40 dark:bg-slate-900/50 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-6 sm:space-x-8 min-w-max">
          {TAB_ITEMS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`py-3.5 text-xs sm:text-sm font-extrabold transition-all border-b-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'border-blue-600 text-slate-900 dark:text-white font-black'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

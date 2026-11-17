import React from 'react';
import { ArrowLeft, ArrowRight, Check, Plus, Trash2 } from 'lucide-react';
import { SearchableDropdown } from './SearchableDropdown';
import { QUALIFICATION_OPTIONS } from '../constants';

interface RegisterStep3Props {
  qualification: string;
  setQualification: (val: string) => void;
  previousCourses: string[];
  newCourseInput: string;
  setNewCourseInput: (val: string) => void;
  domain: string;
  setDomain: (val: string) => void;
  step3Error: string;
  isSubmitting?: boolean;
  onAddCourse: () => void;
  onRemoveCourse: (course: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
  locale: string;
}

export const RegisterStep3: React.FC<RegisterStep3Props> = ({
  qualification,
  setQualification,
  previousCourses,
  newCourseInput,
  setNewCourseInput,
  domain,
  setDomain,
  step3Error,
  isSubmitting = false,
  onAddCourse,
  onRemoveCourse,
  onBack,
  onSubmit,
  locale,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 pt-1 animate-fade-in">
      <div className="space-y-3.5 sm:space-y-4">
        {/* 1. Qualification */}
        <SearchableDropdown
          label={locale === 'hi' ? '1. शैक्षणिक योग्यता' : '1. Academic Qualification'}
          value={qualification}
          onChange={setQualification}
          options={QUALIFICATION_OPTIONS}
          placeholder={locale === 'hi' ? 'योग्यता चुनें' : 'Select qualification'}
          searchPlaceholder={locale === 'hi' ? 'योग्यता खोजें...' : 'Search qualification...'}
        />

        {/* 2. Previous Courses Completed */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-[13px] font-bold text-slate-800">
              {locale === 'hi' ? '2. पूर्व में पूर्ण किए गए पाठ्यक्रम' : '2. Previous Courses Completed'}
            </label>
            <span className="text-[10px] font-bold text-[#0B57D0] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              {previousCourses.length} {locale === 'hi' ? 'जोड़े गए' : 'Added'}
            </span>
          </div>

          {/* Input block to add any course completed */}
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                value={newCourseInput}
                onChange={(e) => setNewCourseInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onAddCourse();
                  }
                }}
                placeholder={locale === 'hi' ? 'पूर्ण किए गए पाठ्यक्रम का नाम दर्ज करें...' : 'Enter completed course name...'}
                style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
                className="w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all"
              />
            </div>

            <button
              type="button"
              onClick={onAddCourse}
              className="h-11 px-5 bg-[#0B57D0] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all shrink-0 cursor-pointer flex items-center space-x-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>{locale === 'hi' ? 'जोड़ें' : 'Add'}</span>
            </button>
          </div>

          {/* List of Added Completed Courses */}
          <div className="space-y-1.5 max-h-32 overflow-y-auto pr-0.5 pt-0.5">
            {previousCourses.length > 0 ? (
              previousCourses.map((course) => (
                <div
                  key={course}
                  className="p-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm flex items-center justify-between gap-2 hover:bg-blue-50/40 transition-colors"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <Check className="h-4 w-4 text-emerald-600 stroke-[2.5] shrink-0" />
                    <span className="truncate text-slate-800 font-medium text-xs sm:text-sm">{course}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveCourse(course)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors shrink-0"
                    title={locale === 'hi' ? 'हटाएं' : 'Remove course'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic py-1.5 text-center">
                {locale === 'hi'
                  ? 'अभी तक कोई पाठ्यक्रम नहीं जोड़ा गया। ऊपर नाम दर्ज कर जोड़ें पर क्लिक करें।'
                  : 'No previous courses added yet. Type course name above and click Add.'}
              </p>
            )}
          </div>
        </div>

        {/* 3. Domain */}
        <div className="space-y-1.5">
          <label className="text-xs sm:text-[13px] font-bold text-slate-800 block">
            {locale === 'hi' ? '3. सांख्यिकीय क्षेत्र' : '3. Domain'}
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder={locale === 'hi' ? 'अपना सांख्यिकीय क्षेत्र टाइप करें (उदा. सर्वेक्षण पद्धति, राष्ट्रीय लेखा...)' : 'Type your statistical domain (e.g. Survey Methodology, National Accounts...)'}
              style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
              className="w-full h-11 py-2 text-xs sm:text-sm font-medium rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-[#0B57D0] focus:ring-3 focus:ring-blue-100 text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all"
            />
          </div>
        </div>

        {step3Error && (
          <div className="text-[11px] font-bold text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200 text-center">
            {step3Error}
          </div>
        )}
      </div>

      {/* Step 3 Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer flex items-center space-x-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{locale === 'hi' ? 'वापस' : 'Back'}</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-[#0B1E48] hover:bg-[#0D2972] text-white font-bold text-sm py-2.5 px-8 rounded-xl shadow-md transition-all flex items-center space-x-2 cursor-pointer ${
            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          <span>
            {isSubmitting
              ? (locale === 'hi' ? 'सत्यापित और पंजीकृत हो रहा है...' : 'Creating Sovereign Account...')
              : (locale === 'hi' ? 'पंजीकरण पूर्ण करें' : 'Complete Registration')}
          </span>
          {!isSubmitting && <ArrowRight className="h-4 w-4" />}
        </button>
      </div>
    </form>
  );
};

import { useUIStore } from '@/store/useUIStore';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';

const dictionaries: Record<string, any> = { en, hi };

// Domain dictionary mappings for official statistical terms
const DOMAIN_HINDI_MAP: Record<string, string> = {
  'Survey Methodology & Sampling': 'सर्वेक्षण पद्धति और नमूनाकरण',
  'Price Statistics & Index Numbers': 'मूल्य सांख्यिकी एवं सूचकांक',
  'National Accounts & Macro-Aggregation': 'राष्ट्रीय लेखा एवं समष्टि-एकत्रीकरण',
  'Data Analytics & Computation (R/Python)': 'डेटा एनालिटिक्स और संगणना (R/Python)',
  'Official Data Governance & NDSAP': 'आधिकारिक डेटा शासन एवं एनडीएसएपी',
  'CAPI & Field Operations': 'सीएपीआई एवं फील्ड संचालन',
};

const DEPARTMENT_HINDI_MAP: Record<string, string> = {
  'National Sample Survey Office (NSSO)': 'राष्ट्रीय प्रतिदर्श सर्वेक्षण कार्यालय (NSSO)',
  'Central Statistics Office (CSO)': 'केंद्रीय सांख्यिकी कार्यालय (CSO)',
  'National Accounts Division (NAD)': 'राष्ट्रीय लेखा प्रभाग (NAD)',
  'Economic Statistics & Price Indices': 'आर्थिक सांख्यिकी एवं मूल्य सूचकांक प्रभाग',
  'State Directorate of Economics and Statistics (DES)': 'राज्य अर्थशास्त्र एवं सांख्यिकी निदेशालय (DES)',
  'Ministry of Statistics & Programme Implementation (MoSPI)': 'सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय (MoSPI)',
};

const CADRE_HINDI_MAP: Record<string, string> = {
  'SSS': 'अधीनस्थ सांख्यिकी सेवा (SSS)',
  'ISS': 'भारतीय सांख्यिकी सेवा (ISS)',
  'Field Staff': 'क्षेत्रीय कर्मचारी (Field Staff)',
  'Technical Staff': 'तकनीकी कर्मचारी (Technical Staff)',
  'Subordinate Statistical Service (SSS)': 'अधीनस्थ सांख्यिकी सेवा (SSS)',
  'Indian Statistical Service (ISS)': 'भारतीय सांख्यिकी सेवा (ISS)',
};

const DESIGNATION_HINDI_MAP: Record<string, string> = {
  'Senior Statistical Officer': 'वरिष्ठ सांख्यिकी अधिकारी',
  'Junior Statistical Officer': 'कनिष्ठ सांख्यिकी अधिकारी',
  'Assistant Director': 'सहायक निदेशक',
  'Deputy Director': 'उप निदेशक',
  'Joint Director': 'संयुक्त निदेशक',
  'Director': 'निदेशक',
  'Field Investigator': 'क्षेत्र अन्वेषक',
  'Statistical Assistant': 'सांख्यिकी सहायक',
};

export function useTranslation() {
  const locale = useUIStore((state) => state.locale);
  const currentDict = dictionaries[locale] || dictionaries.en;

  const t = (path: string, fallback?: string, params?: Record<string, string | number>): string => {
    const keys = path.split('.');
    let value: any = currentDict;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        value = undefined;
        break;
      }
    }

    let text = typeof value === 'string' ? value : (fallback !== undefined ? fallback : path);

    if (params && typeof text === 'string') {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
      });
    }

    return text;
  };

  const translateDomain = (domain: string): string => {
    if (locale === 'hi' && DOMAIN_HINDI_MAP[domain]) {
      return DOMAIN_HINDI_MAP[domain];
    }
    return domain;
  };

  const translateDepartment = (dept: string): string => {
    if (locale === 'hi' && DEPARTMENT_HINDI_MAP[dept]) {
      return DEPARTMENT_HINDI_MAP[dept];
    }
    return dept;
  };

  const translateCadre = (cadre: string): string => {
    if (locale === 'hi' && CADRE_HINDI_MAP[cadre]) {
      return CADRE_HINDI_MAP[cadre];
    }
    return cadre;
  };

  const translateDesignation = (designation: string): string => {
    if (locale === 'hi' && DESIGNATION_HINDI_MAP[designation]) {
      return DESIGNATION_HINDI_MAP[designation];
    }
    return designation;
  };

  return {
    t,
    locale,
    translateDomain,
    translateDepartment,
    translateCadre,
    translateDesignation,
  };
}

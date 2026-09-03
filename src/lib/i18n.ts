import { useUIStore } from '@/store/useUIStore';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';

const dictionaries = { en, hi };

export function useTranslation() {
  const locale = useUIStore((state) => state.locale);
  const currentDict = dictionaries[locale] || dictionaries.en;

  const t = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let value: any = currentDict;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return fallback || path;
      }
    }

    return typeof value === 'string' ? value : fallback || path;
  };

  return { t, locale };
}

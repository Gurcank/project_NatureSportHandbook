'use client';

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

export type Language = 'en' | 'tr';

const STORAGE_KEY = 'language';
const CHANGE_EVENT = 'handbook:language-change';

interface SettingsContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function isLanguage(value: unknown): value is Language {
  return value === 'en' || value === 'tr';
}

/**
 * The chosen language lives outside React so it can be read synchronously
 * during render without a hydration mismatch. It is held in memory as well as
 * in storage, so the toggle still works where storage is blocked.
 */
let cachedLanguage: Language | null = null;

function getLanguage(): Language {
  if (cachedLanguage === null) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      cachedLanguage = isLanguage(stored) ? stored : 'en';
    } catch {
      cachedLanguage = 'en';
    }
  }
  return cachedLanguage;
}

function getServerLanguage(): Language {
  return 'en';
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    cachedLanguage = isLanguage(event.newValue) ? event.newValue : 'en';
    onChange();
  };

  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

function setStoredLanguage(language: Language) {
  cachedLanguage = language;
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {
    // Keep the in-memory value even if browser storage is unavailable.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(subscribe, getLanguage, getServerLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <SettingsContext.Provider value={{ language, setLanguage: setStoredLanguage }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

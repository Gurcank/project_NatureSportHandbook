'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'en' | 'tr';
export type Theme = 'light' | 'dark';

interface SettingsContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function readStoredSetting<T extends string>(key: string, fallback: T, allowedValues: readonly T[]): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const storedValue = localStorage.getItem(key) as T | null;
    return storedValue && allowedValues.includes(storedValue) ? storedValue : fallback;
  } catch {
    return fallback;
  }
}

function writeStoredSetting(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Keep the in-memory value even if browser storage is unavailable.
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => readStoredSetting('language', 'en', ['en', 'tr']));
  const [theme, setThemeState] = useState<Theme>(() => readStoredSetting('theme', 'light', ['light', 'dark']));

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    writeStoredSetting('language', newLanguage);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    writeStoredSetting('theme', newTheme);
  };

  return (
    <SettingsContext.Provider value={{ language, setLanguage, theme, setTheme }}>
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

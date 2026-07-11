'use client';

import { useSettings } from '@/context/SettingsContext';
import { translations } from '@/lib/translations';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { language, setLanguage } = useSettings();
  const t = (key: keyof typeof translations.en) =>
    (translations[language] as Record<string, string>)[key] || key;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative max-h-screen w-full max-w-md overflow-y-auto rounded-t-2xl border border-[#7b5c35]/35 bg-[linear-gradient(180deg,rgba(244,235,214,0.98)_0%,rgba(229,213,178,0.98)_100%)] shadow-2xl sm:w-96 sm:rounded-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-[#7b5c35]/18 bg-[linear-gradient(90deg,rgba(96,119,81,0.94)_0%,rgba(64,84,47,0.94)_100%)] px-6 py-6">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">⚙️</span>
            <h2 className="text-2xl font-bold text-[#f2ecdf]">
              {t('settings')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-black/10"
          >
            <svg
              className="h-6 w-6 text-[#f2ecdf]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div>
            <h3 className="mb-4 flex items-center space-x-2 text-lg font-semibold text-[#3f372f]">
              <span className="text-xl">🌐</span>
              <span>{t('language')}</span>
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => setLanguage('en')}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                  language === 'en'
                    ? 'border-[#5f7550] bg-[#5f7550]/12'
                    : 'border-[#8a6542]/25 hover:border-[#5f7550]/55'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🇺🇸</span>
                    <span className="font-semibold text-[#3f372f]">
                      English (US)
                    </span>
                  </div>
                  {language === 'en' && (
                    <span className="font-bold text-[#5f7550]">✓</span>
                  )}
                </div>
              </button>

              <button
                onClick={() => setLanguage('tr')}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                  language === 'tr'
                    ? 'border-[#5f7550] bg-[#5f7550]/12'
                    : 'border-[#8a6542]/25 hover:border-[#5f7550]/55'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🇹🇷</span>
                    <span className="font-semibold text-[#3f372f]">
                      Türkçe
                    </span>
                  </div>
                  {language === 'tr' && (
                    <span className="font-bold text-[#5f7550]">✓</span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#7b5c35]/18 bg-[linear-gradient(90deg,rgba(107,82,50,0.18)_0%,rgba(95,117,80,0.14)_100%)] px-6 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-[linear-gradient(90deg,#5f7550_0%,#8a6542_100%)] px-4 py-2 font-semibold text-[#f4eedf] transition-colors hover:opacity-95"
          >
            {t('closeSettings')}
          </button>
        </div>
      </div>
    </div>
  );
}

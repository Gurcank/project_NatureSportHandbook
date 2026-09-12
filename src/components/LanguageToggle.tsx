'use client';

import { useSettings, type Language } from '@/context/SettingsContext';

const OPTIONS: { value: Language; label: string; aria: string }[] = [
  { value: 'tr', label: 'TR', aria: 'Türkçe' },
  { value: 'en', label: 'EN', aria: 'English' },
];

const GROUP_LABEL: Record<Language, string> = { tr: 'Dil', en: 'Language' };

/**
 * The only chrome on the page, made as something that could be lying out in
 * this scene rather than a control laid over it: a small offcut of the
 * table's own weathered wood with the two languages cut into it. The one in
 * use is painted in with the sign's white; the other is a bare groove, which
 * catches the light as the pointer passes over it. A screw between the two
 * holds it together, like the ones in the sign.
 */
export default function LanguageToggle() {
  const { language, setLanguage } = useSettings();

  return (
    <div role="group" aria-label={GROUP_LABEL[language]} className="lang-plank">
      {OPTIONS.map((option, index) => (
        <span key={option.value} className="flex items-center gap-[0.15rem]">
          {index > 0 ? <span aria-hidden="true" className="lang-plank-screw" /> : null}
          <button
            type="button"
            lang={option.value}
            aria-label={option.aria}
            aria-pressed={language === option.value}
            onClick={() => setLanguage(option.value)}
            className="lang-plank-option"
          >
            {option.label}
          </button>
        </span>
      ))}
    </div>
  );
}

'use client';

import { useSettings, type Language } from '@/context/SettingsContext';

const OPTIONS: { value: Language; label: string; aria: string }[] = [
  { value: 'tr', label: 'TR', aria: 'Türkçe' },
  { value: 'en', label: 'EN', aria: 'English' },
];

/**
 * A pencil loop drawn as a fixed path rather than measured at runtime: it
 * overshoots where it closes, the way a real one does, and never has to
 * re-measure when the label changes. `pathLength` normalises the stroke so the
 * dash animation in `globals.css` can draw it from nothing to closed.
 */
function PencilLoop() {
  return (
    <svg
      viewBox="0 0 64 36"
      preserveAspectRatio="none"
      className="pencil-loop pointer-events-none absolute -inset-x-1 -inset-y-0.5 h-[calc(100%+0.25rem)] w-[calc(100%+0.5rem)]"
      aria-hidden="true"
    >
      <path
        d="M45 5.5 C 24 0.5, 6 6, 5 17 C 4 27.5, 24 33, 41 31 C 56 29, 61.5 19, 57 11.5 C 53.5 5.5, 45 3, 37 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        pathLength="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * The only chrome on the page. Written by hand and circled in pencil rather
 * than drawn as a control, so it belongs to the notebook instead of sitting
 * on top of it. Hovering an unselected language draws the same loop on, so the
 * hover state is a preview of the choice rather than a separate effect.
 */
export default function LanguageToggle() {
  const { language, setLanguage } = useSettings();

  return (
    // On a slip of paper of its own: behind it is now a photograph that changes
    // every visit, or the dark timber of the kiosk, and the unselected language
    // is drawn in soft pencil that disappears against either.
    <div className="fixed right-3 top-2 z-50 flex items-center rounded-full bg-[var(--paper)] px-1.5 py-0.5 shadow-[0_0.3rem_0.8rem_rgba(30,18,8,0.28)] sm:right-6 sm:top-4">
      {OPTIONS.map((option, index) => {
        const active = language === option.value;
        return (
          <span key={option.value} className="flex items-center">
            {index > 0 ? (
              <span aria-hidden="true" className="px-0.5 text-[var(--pencil-soft)]">
                ·
              </span>
            ) : null}
            <button
              type="button"
              lang={option.value}
              aria-label={option.aria}
              aria-pressed={active}
              onClick={() => setLanguage(option.value)}
              className={`pencil-loop-host relative cursor-pointer rounded-[0.2rem] px-2.5 py-1 text-base font-bold tracking-wide transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pencil)] ${
                active
                  ? 'is-drawn text-[var(--pencil)]'
                  : 'text-[var(--pencil-soft)] opacity-65 hover:opacity-100'
              }`}
            >
              <PencilLoop />
              {option.label}
            </button>
          </span>
        );
      })}
    </div>
  );
}

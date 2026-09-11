'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

type StageControls = {
  /** Brings the reader's eye down over one point on screen. */
  leanIn: (point: { x: number; y: number }) => void;
  sitBack: () => void;
  isLeanedIn: boolean;
};

const StageContext = createContext<StageControls | null>(null);

export function useStage(): StageControls | null {
  return useContext(StageContext);
}

/**
 * The world the reader is looking down on: the meadow, the table, and
 * everything on it.
 *
 * Leaning in moves the reader, not the book. The whole world is scaled about
 * the point that was pressed, so the grass, the table's edge and the pencil
 * all come closer together — which is what bending over a table looks like —
 * instead of the book alone swelling towards the reader over a scene that
 * stays put.
 */
export default function Stage({ children }: { children: ReactNode }) {
  const worldRef = useRef<HTMLDivElement>(null);
  /** Where the reader has leaned in, as a percentage of the world's box. */
  const [focus, setFocus] = useState<{ x: number; y: number } | null>(null);

  const leanIn = useCallback((point: { x: number; y: number }) => {
    const box = worldRef.current?.getBoundingClientRect();
    if (!box || box.width === 0 || box.height === 0) return;
    setFocus({
      x: ((point.x - box.left) / box.width) * 100,
      y: ((point.y - box.top) / box.height) * 100,
    });
  }, []);

  const sitBack = useCallback(() => setFocus(null), []);

  /**
   * Leaning in is a look, not a place: one press anywhere — on the page, on a
   * tab, on the photograph itself, off the table entirely — sits the reader
   * back up, and does nothing else. The listeners sit on the window in the
   * capture phase, ahead of React and of page-flip's own press handlers, so
   * that press can neither follow a link, re-open the photograph, nor start a
   * fold.
   */
  useEffect(() => {
    if (focus === null) return;

    // Presses are stopped, not prevented: preventing a touchstart would also
    // cancel the click it becomes, and the click is what sits the reader back.
    const stop = (event: Event) => event.stopPropagation();
    const onClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setFocus(null);
    };
    window.addEventListener('pointerdown', stop, true);
    window.addEventListener('mousedown', stop, true);
    window.addEventListener('touchstart', stop, true);
    window.addEventListener('click', onClick, true);
    return () => {
      window.removeEventListener('pointerdown', stop, true);
      window.removeEventListener('mousedown', stop, true);
      window.removeEventListener('touchstart', stop, true);
      window.removeEventListener('click', onClick, true);
    };
  }, [focus]);

  const controls = useMemo(
    () => ({ leanIn, sitBack, isLeanedIn: focus !== null }),
    [leanIn, sitBack, focus],
  );

  return (
    <StageContext.Provider value={controls}>
      <div
        ref={worldRef}
        className={`world ${focus ? 'is-leaned-in' : ''}`}
        style={{ transformOrigin: focus ? `${focus.x}% ${focus.y}%` : '50% 50%' }}
      >
        {children}
      </div>
    </StageContext.Provider>
  );
}

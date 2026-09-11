'use client';

import { createContext, useContext, type ReactNode } from 'react';

type BookNavValue = {
  /** Jump to a section without a route change, so the book stays mounted. */
  goToSection: (sectionId: string) => void;
  /** Jump to one exact leaf — what a tab stuck to a page needs. */
  goToLeaf: (leafIndex: number) => void;
  currentSectionId: string;
};

const BookNavContext = createContext<BookNavValue | null>(null);

export function BookNavProvider({ value, children }: { value: BookNavValue; children: ReactNode }) {
  return <BookNavContext.Provider value={value}>{children}</BookNavContext.Provider>;
}

export function useBookNav(): BookNavValue {
  const context = useContext(BookNavContext);
  if (!context) throw new Error('useBookNav must be used inside a BookNavProvider');
  return context;
}

/** A modified click means the visitor wants a new tab or window; leave it alone. */
export function isPlainClick(event: React.MouseEvent): boolean {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

'use client';

import type { ReactNode } from 'react';
import { sectionById } from '@/lib/book';
import { isPlainClick, useBookNav } from './BookNav';

/**
 * Navigates inside the book. It is a real anchor so the section is
 * link-shaped for crawlers, middle-clicks, and "copy link address", but a
 * plain click flips pages instead of reloading the route — a route change
 * would remount the book and drop the page-turn.
 */
export default function BookLink({
  sectionId,
  leafIndex,
  children,
  className,
  onNavigate,
  'aria-current': ariaCurrent,
}: {
  sectionId: string;
  /** The exact leaf to open. Without it the section's first leaf is used. */
  leafIndex?: number;
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
  /** Marks the tab for the page being read; anchors take it directly. */
  'aria-current'?: 'page';
}) {
  const { goToSection, goToLeaf } = useBookNav();
  const href = sectionById(sectionId)?.slug ?? '/';

  return (
    <a
      href={href}
      className={className}
      aria-current={ariaCurrent}
      onClick={(event) => {
        if (!isPlainClick(event)) return;
        event.preventDefault();
        if (leafIndex === undefined) goToSection(sectionId);
        else goToLeaf(leafIndex);
        onNavigate?.();
      }}
    >
      {children}
    </a>
  );
}

'use client';

import Handwritten from '@/components/Handwritten';

/**
 * The half-title: the book's name written across the first leaf and nothing
 * else. It faces the front paste-down, so it is the first paper the reader
 * sees, and a handbook names itself in the owner's hand rather than in type.
 */
export default function TitleLeaf() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Handwritten
        seed={7}
        className="block max-w-[8em] text-center text-[2.9em] leading-[1.06] text-[var(--pencil)]"
      >
        Nature &amp; Sport Handbook
      </Handwritten>

      <span
        aria-hidden="true"
        className="mt-[1.4em] h-px w-[3.5em] bg-[var(--pencil-soft)] opacity-50"
      />
    </div>
  );
}

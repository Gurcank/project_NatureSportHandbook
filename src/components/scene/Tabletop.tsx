'use client';

import type { ReactNode } from 'react';
import WoodenSign from '@/components/WoodenSign';
import { PaintTin, Pencil } from './TableProps';

/**
 * A small wooden table out in the meadow, seen from straight above — only its
 * top shows, never its legs. On it: the handbook, the sign it came with, a
 * pencil and a tin of paint.
 *
 * The top is cut to the book (see `--table-*` in globals.css), so the book keeps
 * its own box and the table is only ever the room around it. Everything else
 * on the table is placed in that room, clear of the book and of its tabs.
 */
export default function Tabletop({ children }: { children: ReactNode }) {
  return (
    <div className="table-top">
      <span aria-hidden="true" className="table-knots" />

      <div className="table-sign">
        <WoodenSign />
      </div>

      <PaintTin className="table-tin" />

      <div className="table-book">{children}</div>

      <Pencil className="table-pencil" />
    </div>
  );
}

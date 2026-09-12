'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

import type { Field, Insect, Rect, Sprite, Tuft, TuftSprites } from './meadow/types';
import { readPalette } from './meadow/palette';
import { seeded } from './meadow/wind';
import { buildSprites, buildTuftSprites, drawGround, layFlowers, layTufts } from './meadow/ground';
import { drawAir, spawnInsects, step } from './meadow/insects';

/**
 * The meadow coming alive around the table: tufts of grass leaning in the wind
 * that rolls across it, wild flowers nodding among them, and a few butterflies
 * and bees working the flowers.
 *
 * Drawn on two canvases over the grass photograph. The grass and flowers lie
 * on the ground, under the table; the insects fly, so they are drawn over it —
 * but they steer round the book, because nothing should cross the page being
 * read. The sun is the scene's one light, up and to the left: every flower and
 * insect casts its shadow down and to the right, a flying one further off than
 * one that has landed.
 *
 * Seeded, so the same screen gets the same meadow on every visit. Holds a
 * single still frame for anyone who asks their system for less motion, and
 * stops drawing while the tab is hidden.
 */

export default function MeadowLife() {
  const groundRef = useRef<HTMLCanvasElement>(null);
  const airRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ground = groundRef.current;
    const air = airRef.current;
    const world = ground?.parentElement;
    const groundContext = ground?.getContext('2d');
    const airContext = air?.getContext('2d');
    if (!ground || !air || !world || !groundContext || !airContext) return;

    const palette = readPalette();
    const field: Field = {
      width: 0,
      height: 0,
      flowers: [],
      table: null,
      book: null,
      random: seeded(911),
    };
    let dpr = 1;
    let sprites = new Map<string, Sprite>();
    let tufts: Tuft[] = [];
    let tuftSprites: TuftSprites = [];
    let insects: Insect[] = [];

    // In the world's own pixels: leaning in scales the world, and the flight
    // paths must not scale with it.
    const measure = () => {
      const box = world.getBoundingClientRect();
      const scale = world.offsetWidth ? box.width / world.offsetWidth : 1;
      const local = (selector: string): Rect | null => {
        const element = world.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return {
          left: (rect.left - box.left) / scale,
          top: (rect.top - box.top) / scale,
          right: (rect.right - box.left) / scale,
          bottom: (rect.bottom - box.top) / scale,
        };
      };
      field.table = local('.table-top');
      field.book = local('.book-fit');
    };

    const layout = () => {
      field.width = world.offsetWidth;
      field.height = world.offsetHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      for (const canvas of [ground, air]) {
        canvas.width = Math.round(field.width * dpr);
        canvas.height = Math.round(field.height * dpr);
      }
      measure();
      field.flowers = layFlowers(field.width, field.height);
      tufts = layTufts(field.width, field.height);
      sprites = buildSprites(palette, dpr);
      tuftSprites = buildTuftSprites(palette, dpr);
      insects = spawnInsects(field);
    };

    const drawFrame = (t: number) => {
      drawGround(groundContext, dpr, field.flowers, sprites, tufts, tuftSprites, field.table, t);
      drawAir(airContext, dpr, insects, palette);
    };

    const drawStill = () => {
      measure();
      drawFrame(0);
    };

    let frame = 0;
    let last = 0;
    let lastMeasure = 0;
    const tick = (now: number) => {
      const t = now / 1000;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      // The book opens, shuts and changes size under the insects; keep up.
      if (now - lastMeasure > 500) {
        measure();
        lastMeasure = now;
      }
      for (const insect of insects) step(insect, dt, t, field);
      drawFrame(t);
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (reducedMotion || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => cancelAnimationFrame(frame);

    layout();
    // The table and the book settle after the first paint: measure again once
    // they have, so nothing lands on the page in the meantime.
    const settle = window.setTimeout(drawStill, 900);
    if (reducedMotion) drawStill();
    else start();

    const observer = new ResizeObserver(() => {
      layout();
      if (reducedMotion) drawStill();
    });
    observer.observe(world);
    const onVisibility = () => {
      stop();
      start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      window.clearTimeout(settle);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reducedMotion]);

  return (
    <>
      <canvas ref={groundRef} aria-hidden="true" className="meadow-life meadow-life--ground" />
      <canvas ref={airRef} aria-hidden="true" className="meadow-life meadow-life--air" />
    </>
  );
}

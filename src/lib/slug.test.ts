import { describe, expect, it } from 'vitest';
import { slugify, titleFromSlug } from './slug';

describe('slugify', () => {
  it('lowercases and hyphenates spaces', () => {
    expect(slugify('Button Mushroom')).toBe('button-mushroom');
  });

  it('strips accents', () => {
    expect(slugify('Yürüyüş')).toBe('yuruyus');
  });

  it('removes characters outside a-z0-9-', () => {
    expect(slugify('Amanita Phalloides (Death Cap)')).toBe('amanita-phalloides-death-cap');
  });

  it('collapses repeated separators and trims leading/trailing hyphens', () => {
    expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces');
  });
});

describe('titleFromSlug', () => {
  it('capitalizes each hyphen-separated word', () => {
    expect(titleFromSlug('button-mushroom')).toBe('Button Mushroom');
  });

  it('round-trips a simple slugify output', () => {
    expect(titleFromSlug(slugify('Rose'))).toBe('Rose');
  });
});

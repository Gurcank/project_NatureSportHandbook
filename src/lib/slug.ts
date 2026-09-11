export function slugify(text: string) {
  return (
    text
      .toString()
      .toLowerCase()
      // Dotless i has no NFKD decomposition, so the accent strip below would
      // delete it outright and collide "sığın" with "sgn". Fold it first.
      .replace(/ı/g, 'i')
      .normalize('NFKD')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  );
}

export function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

const SIZES = [1280, 1920, 2880, 3648] as const;

/**
 * The grass the table stands in, seen from straight above.
 *
 * Served as files rather than through the image optimiser: the largest
 * candidate is the original photograph, byte for byte, and `srcset` hands
 * smaller screens a proportionate copy. The original is 3648px wide, which
 * covers any screen up to that many device pixels across without being
 * stretched; past that the grass is tiled at its own resolution instead of
 * being blown up (see `.meadow` in globals.css).
 */
export default function Meadow() {
  return (
    <div aria-hidden="true" className="meadow">
      {/* eslint-disable-next-line @next/next/no-img-element -- deliberately not
          next/image: the original must reach wide screens without being
          re-encoded, and the tiled fallback reuses the same file. */}
      <img
        src="/images/meadow/grass-1920.jpg"
        srcSet={SIZES.map((w) => `/images/meadow/grass-${w}.jpg ${w}w`).join(', ')}
        sizes="100vw"
        alt=""
        decoding="async"
        className="meadow-photo"
      />
    </div>
  );
}

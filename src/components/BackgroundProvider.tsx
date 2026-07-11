'use client';

import { ReactNode, useState, useEffect } from 'react';

const NATURE_BACKGROUNDS = [
  {
    id: 1,
    url: 'https://picsum.photos/id/1018/1280/720',
    title: 'Mountain Range',
    photographer: 'Picsum',
  },
  {
    id: 2,
    url: 'https://picsum.photos/id/1015/1280/720',
    title: 'Forest Sunset',
    photographer: 'Picsum',
  },
  {
    id: 3,
    url: 'https://picsum.photos/id/1016/1280/720',
    title: 'Lake Landscape',
    photographer: 'Picsum',
  },
  {
    id: 4,
    url: 'https://picsum.photos/id/1024/1280/720',
    title: 'Alpine Peak',
    photographer: 'Picsum',
  },
  {
    id: 5,
    url: 'https://picsum.photos/id/1020/1280/720',
    title: 'Ocean Waves',
    photographer: 'Picsum',
  },
  {
    id: 6,
    url: 'https://picsum.photos/id/1039/1280/720',
    title: 'Birch Forest',
    photographer: 'Picsum',
  },
  {
    id: 7,
    url: 'https://picsum.photos/id/1043/1280/720',
    title: 'Mountain Vista',
    photographer: 'Picsum',
  },
  {
    id: 8,
    url: 'https://picsum.photos/id/1056/1280/720',
    title: 'Peak Adventure',
    photographer: 'Picsum',
  },
];

export default function BackgroundProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [backgroundUrl, setBackgroundUrl] = useState<string>('');

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const randomIndex = Math.floor(Math.random() * NATURE_BACKGROUNDS.length);
      setBackgroundUrl(NATURE_BACKGROUNDS[randomIndex].url);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={
        backgroundUrl
          ? {
              backgroundImage: `url('${backgroundUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'scroll',
            }
          : undefined
      }
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(95,119,80,0.12) 0%, rgba(143,106,69,0.10) 42%, rgba(58,40,28,0.24) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

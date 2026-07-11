
'use client';

import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import { Icons, IconWrapper } from '@/lib/icons';
import NotebookSpread from '@/components/NotebookSpread';

// Grass blades component - curved SVG


export default function HomePage() {
  const { language } = useSettings();

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col items-center justify-start pt-6">
          <div className="relative z-10 w-full max-w-4xl px-2 text-center">
            <div
              className="relative mx-auto max-w-3xl px-8 py-10 sm:px-12 sm:py-12"
              style={{ transform: 'rotate(-0.6deg)' }}
            >
              <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true" focusable="false">
                <defs>
                  <filter id="bark-distort" x="-15%" y="-15%" width="130%" height="130%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.018 0.11" numOctaves="2" seed="8" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>

              <div className="pointer-events-none absolute left-[1%] right-[1%] top-[10%] bottom-[10%] bg-[linear-gradient(180deg,#b88d5a_0%,#96683f_48%,#7a5131_100%)] [clip-path:polygon(0_0,88%_0,100%_50%,88%_100%,0_100%)] shadow-[0_17px_34px_rgba(31,19,10,0.34),inset_0_1px_0_rgba(241,220,186,0.22),inset_0_-10px_18px_rgba(47,29,15,0.42)]" />
              <div className="pointer-events-none absolute left-[1%] right-[1%] top-[10%] bottom-[10%] opacity-70 bg-[repeating-linear-gradient(84deg,rgba(193,145,90,0.22)_0px,rgba(193,145,90,0.22)_12px,rgba(145,98,54,0.34)_12px,rgba(145,98,54,0.34)_24px,rgba(106,69,39,0.26)_24px,rgba(106,69,39,0.26)_36px)] [clip-path:polygon(0_0,88%_0,100%_50%,88%_100%,0_100%)]" />
              <div className="pointer-events-none absolute left-[1%] right-[1%] top-[10%] bottom-[10%] opacity-58 bg-[repeating-linear-gradient(96deg,rgba(63,43,24,0.14)_0px,rgba(63,43,24,0.14)_2px,transparent_2px,transparent_28px),radial-gradient(ellipse_at_18%_25%,rgba(239,215,174,0.2),transparent_36%),radial-gradient(ellipse_at_69%_70%,rgba(88,56,29,0.33),transparent_44%)] [clip-path:polygon(0_0,88%_0,100%_50%,88%_100%,0_100%)]" />
              <div className="pointer-events-none absolute left-[1%] right-[1%] top-[10%] bottom-[10%] opacity-46 bg-[linear-gradient(180deg,rgba(78,102,55,0.14)_0%,transparent_18%,rgba(64,84,45,0.13)_36%,transparent_58%,rgba(39,56,31,0.24)_100%),radial-gradient(circle_at_8%_78%,rgba(84,106,62,0.34),transparent_20%),radial-gradient(circle_at_30%_82%,rgba(72,95,54,0.28),transparent_18%),radial-gradient(circle_at_84%_80%,rgba(70,92,52,0.24),transparent_16%)] [clip-path:polygon(0_0,88%_0,100%_50%,88%_100%,0_100%)]" />
              <div className="pointer-events-none absolute left-[1%] right-[1%] top-[10%] bottom-[10%] opacity-44 bg-[linear-gradient(180deg,rgba(32,23,15,0)_0%,rgba(32,23,15,0.07)_28%,rgba(32,23,15,0.16)_58%,rgba(32,23,15,0.28)_100%),repeating-linear-gradient(96deg,transparent_0px,transparent_32px,rgba(41,28,16,0.16)_32px,rgba(41,28,16,0.16)_34px),repeating-linear-gradient(180deg,transparent_0px,transparent_20px,rgba(61,44,27,0.12)_20px,rgba(61,44,27,0.12)_27px)] [clip-path:polygon(0_0,88%_0,100%_50%,88%_100%,0_100%)]" />
              <div className="pointer-events-none absolute left-[1%] right-[1%] top-[10%] bottom-[10%] opacity-36 bg-[radial-gradient(ellipse_at_26%_16%,rgba(244,224,190,0.22),transparent_32%),radial-gradient(ellipse_at_58%_18%,rgba(236,211,171,0.2),transparent_30%),radial-gradient(ellipse_at_76%_24%,rgba(230,203,162,0.15),transparent_28%),radial-gradient(ellipse_at_86%_62%,rgba(70,46,24,0.28),transparent_24%)] [clip-path:polygon(0_0,88%_0,100%_50%,88%_100%,0_100%)]" />
              <div className="pointer-events-none absolute left-[1%] right-[1%] top-[10%] bottom-[10%] opacity-50 bg-[linear-gradient(90deg,rgba(58,35,17,0.22)_0%,transparent_3%,transparent_97%,rgba(58,35,17,0.26)_100%),linear-gradient(180deg,rgba(248,232,200,0.2)_0%,transparent_4%,transparent_95%,rgba(42,25,12,0.32)_100%)] [clip-path:polygon(0_0,88%_0,100%_50%,88%_100%,0_100%)]" />
              <div className="pointer-events-none absolute left-[1%] top-[10%] h-[2px] opacity-55 bg-[linear-gradient(90deg,rgba(248,230,198,0.3),rgba(248,230,198,0.08),rgba(248,230,198,0.28))]" style={{ width: 'calc(87% - 2px)' }} />
              <div className="pointer-events-none absolute left-[1%] bottom-[10%] h-[2px] opacity-90 bg-[linear-gradient(90deg,rgba(54,33,16,0.44),rgba(54,33,16,0.18),rgba(54,33,16,0.4))]" style={{ width: 'calc(87% - 2px)' }} />
              <div className="pointer-events-none absolute left-[5.8%] top-[22%] h-2.5 w-2.5 rounded-full bg-[#55310f]/78 shadow-[inset_0_1px_0_rgba(197,166,124,0.24),0_1px_1px_rgba(26,15,7,0.52)]" />
              <div className="pointer-events-none absolute left-[5.8%] bottom-[22%] h-2.5 w-2.5 rounded-full bg-[#55310f]/78 shadow-[inset_0_1px_0_rgba(197,166,124,0.24),0_1px_1px_rgba(26,15,7,0.52)]" />
              <div className="pointer-events-none absolute right-[12.8%] top-[22%] h-2.5 w-2.5 rounded-full bg-[#55310f]/78 shadow-[inset_0_1px_0_rgba(197,166,124,0.24),0_1px_1px_rgba(26,15,7,0.52)]" />
              <div className="pointer-events-none absolute right-[12.8%] bottom-[22%] h-2.5 w-2.5 rounded-full bg-[#55310f]/78 shadow-[inset_0_1px_0_rgba(197,166,124,0.24),0_1px_1px_rgba(26,15,7,0.52)]" />

              <h1
                style={{
                  color: '#ffffff',
                  filter: 'url(#bark-distort)',
                  transform: 'translateZ(8px)',
                  textShadow:
                    '0 1px 0 rgba(255,255,255,0.2), 0 2px 5px rgba(55,37,19,0.55), 0 0 18px rgba(255,255,255,0.08)',
                  opacity: 0.98,
                }}
                className="relative text-4xl font-serif sm:text-5xl lg:text-6xl"
              >
                {language === 'tr' ? 'Doğa ve Spor El Kitabı' : 'Nature & Sport Handbook'}
              </h1>
              <p
                style={{
                  color: '#ffffff',
                  filter: 'url(#bark-distort)',
                  transform: 'translateZ(6px)',
                  textShadow: '0 1px 0 rgba(255,255,255,0.16), 0 2px 4px rgba(55,37,19,0.42)',
                  opacity: 0.96,
                }}
                className="relative mt-4 text-sm font-serif sm:text-base"
              >
                {language === 'tr'
                  ? 'Doga ve spor kasifleri icin araziye hazir notlar'
                  : 'Field-ready notes for nature and sport explorers'}
              </p>
            </div>
          </div>

          <div className="flex-1 mx-auto w-full max-w-[88rem] px-4 py-4 sm:py-5">
            <NotebookSpread
              leftNotes={[]}
              rightNotes={[]}
              size="xl"
              stickyMode="home"
              leftContent={(
                <div>
                  <div className="relative mb-6 inline-flex items-baseline gap-3">
                    <span
                      className="text-[0.78rem] uppercase tracking-[0.18em] text-[#5a5a5a]/70"
                      style={{
                        fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive',
                        transform: 'translateY(-0.06em)'
                      }}
                    >
                      Chapter
                    </span>
                    <span
                      className="inline-block text-[1.35rem] leading-none"
                      style={{
                        fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive',
                        letterSpacing: '0.08em',
                        transform: 'translateX(0.02em) translateY(-0.04em)',
                        textShadow: '0 1px 0 rgba(255,255,255,0.14)',
                        color: '#5a5a5a',
                        fontWeight: 'bold',
                      }}
                      aria-hidden="true"
                    >
                      Ⅰ
                    </span>
                  </div>

                  <h2
                    style={{ color: '#5a5a5a', fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}
                    className="text-6xl font-serif sm:text-7xl mb-4"
                  >
                    {language === 'tr' ? 'Doğa' : 'Nature'}
                  </h2>

                  <p style={{ color: '#5a5a5a', fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }} className="text-base leading-7 font-serif mb-6">
                    {language === 'tr'
                      ? 'Hayvanlar, bitkiler, mantarlar ve taşlar hakkında notlar.'
                      : 'Notes about animals, plants, mushrooms, and stones.'}
                  </p>

                  <div className="flex flex-col gap-4 pt-2">
                    <Link href="/nature/animals">
                      <div className="group/link relative inline-flex cursor-pointer items-center gap-2 px-2 py-2">
                        <div className="pen-ink-ring pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-full border-2 opacity-0 transition-opacity duration-150 group-hover/link:opacity-100" style={{ borderColor: 'rgba(95, 119, 80, 0.84)', borderTopWidth: '2.4px', borderBottomWidth: '1.8px', transform: 'rotate(-4deg)' }} />
                        <IconWrapper icon={Icons.deer} size={20} color="#5a5a5a" />
                        <span className="relative text-base text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                          {language === 'tr' ? 'Hayvanlar' : 'Animals'}
                        </span>
                      </div>
                    </Link>
                    <Link href="/nature/plants">
                      <div className="group/link relative inline-flex cursor-pointer items-center gap-2 px-2 py-2">
                        <div className="pen-ink-ring pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-full border-2 opacity-0 transition-opacity duration-150 group-hover/link:opacity-100" style={{ borderColor: 'rgba(95, 119, 80, 0.84)', borderTopWidth: '2.4px', borderBottomWidth: '1.8px', transform: 'rotate(-4deg)' }} />
                        <IconWrapper icon={Icons.leaf} size={20} color="#5a5a5a" />
                        <span className="relative text-base text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                          {language === 'tr' ? 'Bitkiler' : 'Plants'}
                        </span>
                      </div>
                    </Link>
                    <Link href="/nature/mushrooms">
                      <div className="group/link relative inline-flex cursor-pointer items-center gap-2 px-2 py-2">
                        <div className="pen-ink-ring pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-full border-2 opacity-0 transition-opacity duration-150 group-hover/link:opacity-100" style={{ borderColor: 'rgba(95, 119, 80, 0.84)', borderTopWidth: '2.4px', borderBottomWidth: '1.8px', transform: 'rotate(-4deg)' }} />
                        <IconWrapper icon={Icons.mushroom} size={20} color="#5a5a5a" />
                        <span className="relative text-base text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                          {language === 'tr' ? 'Mantarlar' : 'Mushrooms'}
                        </span>
                      </div>
                    </Link>
                    <Link href="/nature/stones">
                      <div className="group/link relative inline-flex cursor-pointer items-center gap-2 px-2 py-2">
                        <div className="pen-ink-ring pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-full border-2 opacity-0 transition-opacity duration-150 group-hover/link:opacity-100" style={{ borderColor: 'rgba(95, 119, 80, 0.84)', borderTopWidth: '2.4px', borderBottomWidth: '1.8px', transform: 'rotate(-4deg)' }} />
                        <IconWrapper icon={Icons.rock} size={20} color="#5a5a5a" />
                        <span className="relative text-base text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                          {language === 'tr' ? 'Taşlar ve Mineraller' : 'Stones & Minerals'}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
              rightContent={(
                <div className="pl-8 md:pl-12">
                  <div className="relative mb-6 inline-flex items-baseline gap-3">
                    <span
                      className="text-[0.95rem] uppercase tracking-[0.18em] text-[#5a5a5a]/70"
                      style={{
                        fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive',
                        transform: 'translateY(-0.06em)'
                      }}
                    >
                      Chapter
                    </span>
                    <span
                      className="inline-block text-[1.35rem] leading-none"
                      style={{
                        fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive',
                        letterSpacing: '0.08em',
                        transform: 'translateX(0.02em) translateY(-0.04em)',
                        textShadow: '0 1px 0 rgba(255,255,255,0.14)',
                        color: '#5a5a5a',
                        fontWeight: 'bold',
                      }}
                      aria-hidden="true"
                    >
                      Ⅱ
                    </span>
                  </div>

                  <h2
                    style={{ color: '#5a5a5a', fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}
                    className="text-6xl font-serif sm:text-7xl mb-4"
                  >
                    {language === 'tr' ? 'Spor' : 'Sport'}
                  </h2>

                  <p style={{ color: '#5a5a5a', fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }} className="text-base leading-7 font-serif mb-6">
                    {language === 'tr'
                      ? 'Kara, su ve hava sporları hakkında notlar.'
                      : 'Notes about land, water, and air sports.'}
                  </p>

                  <div className="flex flex-col gap-4 pt-2">
                    <Link href="/sport/hiking">
                      <div className="group/link relative inline-flex cursor-pointer items-center gap-2 px-2 py-2">
                        <div className="pen-ink-ring pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-full border-2 opacity-0 transition-opacity duration-150 group-hover/link:opacity-100" style={{ borderColor: 'rgba(95, 119, 80, 0.84)', borderTopWidth: '2.4px', borderBottomWidth: '1.8px', transform: 'rotate(-4deg)' }} />
                        <IconWrapper icon={Icons.hikingBoot} size={20} color="#5a5a5a" />
                        <span className="relative text-base text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                          {language === 'tr' ? 'Kara Sporları' : 'Land Sports'}
                        </span>
                      </div>
                    </Link>
                    <Link href="/sport/water-sports">
                      <div className="group/link relative inline-flex cursor-pointer items-center gap-2 px-2 py-2">
                        <div className="pen-ink-ring pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-full border-2 opacity-0 transition-opacity duration-150 group-hover/link:opacity-100" style={{ borderColor: 'rgba(95, 119, 80, 0.84)', borderTopWidth: '2.4px', borderBottomWidth: '1.8px', transform: 'rotate(-4deg)' }} />
                        <IconWrapper icon={Icons.waves} size={20} color="#5a5a5a" />
                        <span className="relative text-base text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                          {language === 'tr' ? 'Su Sporları' : 'Water Sports'}
                        </span>
                      </div>
                    </Link>
                    <Link href="/sport/air-sports">
                      <div className="group/link relative inline-flex cursor-pointer items-center gap-2 px-2 py-2">
                        <div className="pen-ink-ring pointer-events-none absolute -inset-x-2 -inset-y-1 rounded-full border-2 opacity-0 transition-opacity duration-150 group-hover/link:opacity-100" style={{ borderColor: 'rgba(95, 119, 80, 0.84)', borderTopWidth: '2.4px', borderBottomWidth: '1.8px', transform: 'rotate(-4deg)' }} />
                        <IconWrapper icon={Icons.parachute} size={20} color="#5a5a5a" />
                        <span className="relative text-base text-[#5a5a5a]" style={{ fontFamily: 'var(--font-kalam), "Segoe Print", "Bradley Hand", cursive' }}>
                          {language === 'tr' ? 'Hava Sporları' : 'Air Sports'}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </section>
    </div>
  );
}


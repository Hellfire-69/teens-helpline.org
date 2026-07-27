'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, { damping: 40, stiffness: 300, mass: 0.8 });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Stable refs so event handlers never read stale state via closure.
  // Using refs instead of state in dependency array prevents re-registration
  // of listeners on every touch move / expansion state change — which was the
  // root cause of the production double-scroll (listener gap race condition).
  const mediaFullyExpandedRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number>(0);

  // Keep ref in sync with state (state still drives rendering, ref drives event handlers).
  useEffect(() => {
    mediaFullyExpandedRef.current = mediaFullyExpanded;
  }, [mediaFullyExpanded]);

  useEffect(() => {
    scrollProgress.set(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    mediaFullyExpandedRef.current = false;
  }, [mediaType, scrollProgress]);

  // Single stable effect — listeners are registered once on mount and removed on unmount.
  // Stale-closure reads are avoided by using refs; no re-registration on state changes.
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const expanded = mediaFullyExpandedRef.current;
      if (expanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        mediaFullyExpandedRef.current = false;
        e.preventDefault();
      } else if (!expanded) {
        // Intercept wheel and drive animation — preventDefault stops native scroll.
        // No scrollTo(0,0) needed; preventDefault alone is sufficient and avoids the race.
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0018;
        const current = scrollProgress.get();
        const newProgress = Math.min(Math.max(current + scrollDelta, 0), 1);
        scrollProgress.set(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          mediaFullyExpandedRef.current = true;
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        touchStartYRef.current = e.touches[0]!.clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const startY = touchStartYRef.current;
      if (!startY || e.touches.length === 0) return;

      const expanded = mediaFullyExpandedRef.current;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const touchY = e.touches[0]!.clientY;
      const deltaY = startY - touchY;

      if (expanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        mediaFullyExpandedRef.current = false;
        e.preventDefault();
      } else if (!expanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.012 : 0.010;
        const scrollDelta = deltaY * scrollFactor;
        const current = scrollProgress.get();
        const newProgress = Math.min(Math.max(current + scrollDelta, 0), 1);
        scrollProgress.set(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          mediaFullyExpandedRef.current = true;
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        touchStartYRef.current = touchY;
      }
    };

    const handleTouchEnd = (): void => {
      touchStartYRef.current = 0;
    };

    window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
    window.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: false });
    window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener('wheel', handleWheel as unknown as EventListener);
      window.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
      window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
    // scrollProgress is a stable MotionValue ref — safe single dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollProgress]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const mediaWidth = useTransform(smoothProgress, [0, 1], [300, isMobileState ? 950 : 1550]);
  const mediaHeight = useTransform(smoothProgress, [0, 1], [400, isMobileState ? 600 : 800]);

  const leftX = useTransform(smoothProgress, [0, 1], ["0vw", isMobileState ? "-180vw" : "-150vw"]);
  const rightX = useTransform(smoothProgress, [0, 1], ["0vw", isMobileState ? "180vw" : "150vw"]);

  const bgOpacity = useTransform(smoothProgress, [0, 1], [1, 0]);
  const overlayOpacity = useTransform(smoothProgress, [0, 1], [0.7, 0.4]);

  const parts = title ? title.split('|') : [];
  let firstWord = '';
  let restOfTitle = '';

  if (parts.length > 1) {
    firstWord = parts[0]?.trim() ?? '';
    restOfTitle = parts[1]?.trim() ?? '';
  } else {
    const words = title ? title.split(' ') : [];
    const middleIndex = Math.ceil(words.length / 2);
    firstWord = words.slice(0, middleIndex).join(' ');
    restOfTitle = words.slice(middleIndex).join(' ');
  }

  const childrenOpacity = useTransform(smoothProgress, [0.85, 1], [0, 1]);
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);

  return (
    <div
      ref={sectionRef}
      className='overflow-x-clip'
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            style={{ opacity: bgOpacity, y: bgY }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              className='w-screen h-screen'
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              priority
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <motion.div
                className='absolute z-0 top-1/2 left-1/2 rounded-2xl overflow-hidden'
                style={{
                  width: mediaWidth,
                  height: mediaHeight,
                  x: '-50%',
                  y: '-50%',
                  maxWidth: '100vw',
                  maxHeight: '100vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                            (mediaSrc.includes('?') ? '&' : '?') +
                            'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                            '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                            mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }} />
                      <motion.div
                        className='absolute inset-0 bg-black/50'
                        style={{ opacity: overlayOpacity }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div className='absolute inset-0 z-10' style={{ pointerEvents: 'none' }} />
                      <motion.div
                        className='absolute inset-0 bg-black/50'
                        style={{ opacity: overlayOpacity }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      fill
                      sizes="100vw"
                      className='object-cover'
                    />
                    <motion.div
                      className='absolute inset-0 bg-black/50'
                      style={{ opacity: overlayOpacity }}
                    />
                  </div>
                )}

                <motion.div
                  className="absolute inset-0 z-30 flex items-center justify-center"
                  style={{ opacity: childrenOpacity, pointerEvents: mediaFullyExpanded ? 'auto' : 'none' }}
                >
                  {children}
                </motion.div>

                <div className='flex flex-col items-center text-center relative z-10 mt-4'>
                  {date && (
                    <motion.p
                      className='text-2xl text-blue-200'
                      style={{ x: leftX }}
                    >
                      {date}
                    </motion.p>
                  )}
                  {scrollToExpand && (
                    <motion.p
                      className='text-blue-200 font-medium text-center'
                      style={{ x: rightX }}
                    >
                      {scrollToExpand}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ${textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                  }`}
              >
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-blue-200'
                  style={{ x: leftX }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-blue-200'
                  style={{ x: rightX }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;

'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowNE } from '@/components/Icons';

export interface HoverImageLinkItem {
  title: string;
  text: string;
  href: string;
  image: string;
}

interface HoverImageLinksProps {
  items: HoverImageLinkItem[];
  imageWidth?: number;
  imageHeight?: number;
  stiffness?: number;
  damping?: number;
  tilt?: number;
  className?: string;
}

export function HoverImageLinks({
  items,
  imageWidth = 320,
  imageHeight = 200,
  stiffness = 160,
  damping = 22,
  tilt = 10,
  className = '',
}: HoverImageLinksProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position & Physics state references (zero re-render RAF loop)
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const rotation = useRef({ current: 0, velocity: 0 });
  const hasInitializedPos = useRef(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Detect touch / coarse pointer devices
  useEffect(() => {
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      !window.matchMedia('(hover: hover)').matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Butter-smooth Euler spring loop
  const updatePhysics = useCallback(
    (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;

      // Spring physics: force = (target - current) * stiffness - velocity * damping
      const fx =
        (targetPos.current.x - currentPos.current.x) * stiffness -
        velocity.current.x * damping;
      velocity.current.x += fx * dt;
      currentPos.current.x += velocity.current.x * dt;

      const fy =
        (targetPos.current.y - currentPos.current.y) * stiffness -
        velocity.current.y * damping;
      velocity.current.y += fy * dt;
      currentPos.current.y += velocity.current.y * dt;

      // Velocity-driven rotation tilt: clamp between -tilt and +tilt
      const targetTilt = Math.max(-tilt, Math.min(tilt, velocity.current.x * 0.032));
      const fRot =
        (targetTilt - rotation.current.current) * 220 -
        rotation.current.velocity * 24;
      rotation.current.velocity += fRot * dt;
      rotation.current.current += rotation.current.velocity * dt;

      // Apply transform directly to DOM
      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%) rotate(${rotation.current.current.toFixed(2)}deg)`;
      }

      rafId.current = requestAnimationFrame(updatePhysics);
    },
    [stiffness, damping, tilt]
  );

  useEffect(() => {
    if (isTouchDevice) return;
    rafId.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isTouchDevice, updatePhysics]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice) return;
    targetPos.current.x = e.clientX;
    targetPos.current.y = e.clientY;

    if (!hasInitializedPos.current) {
      currentPos.current.x = e.clientX;
      currentPos.current.y = e.clientY;
      hasInitializedPos.current = true;
    }
  };

  const handleRowEnter = (index: number, e: React.MouseEvent) => {
    if (isTouchDevice) return;
    setActiveIndex(index);
    setIsHovering(true);

    if (!hasInitializedPos.current) {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      currentPos.current.x = e.clientX;
      currentPos.current.y = e.clientY;
      hasInitializedPos.current = true;
    }
  };

  const handleRowLeave = () => {
    if (isTouchDevice) return;
    // Keep activeIndex until mouse leaves container completely, or let it stay for cross-fades
  };

  const handleContainerLeave = () => {
    if (isTouchDevice) return;
    setIsHovering(false);
    setActiveIndex(null);
    hasInitializedPos.current = false;
  };

  return (
    <div
      className={`hover-image-links-container relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleContainerLeave}
    >
      {/* Floating Spring Physics Image Preview (Desktop Only) */}
      {!isTouchDevice && (
        <div
          ref={cardRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-50 overflow-hidden rounded-2xl border border-white/20 bg-[#120F24]/90 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9),0_0_36px_-6px_rgba(165,139,255,0.3)] backdrop-blur-md transition-all duration-300 ease-out"
          style={{
            width: imageWidth,
            height: imageHeight,
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0.75,
            visibility: isHovering ? 'visible' : 'hidden',
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.title}
              className="absolute inset-0 transition-opacity duration-300 ease-out"
              style={{
                opacity: activeIndex === index ? 1 : 0,
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes={`${imageWidth}px`}
                className="object-cover"
                priority={index === 0}
              />
              {/* Subtle inner dark vignette for rich contrast */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      )}

      {/* Row List */}
      <div className="rows" data-reveal>
        {items.map((r, index) => {
          const isCurrentHovered = activeIndex === index;
          const isOtherHovered = activeIndex !== null && !isCurrentHovered;

          return (
            <Link
              key={r.title}
              href={r.href}
              className="row hover-link-row group"
              data-reveal-item
              onMouseEnter={(e) => handleRowEnter(index, e)}
              onMouseLeave={handleRowLeave}
              style={{
                opacity: isOtherHovered ? 0.38 : 1,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              <span className="t transition-colors duration-200 group-hover:text-[#A58BFF]">
                {r.title}
              </span>
              <span className="d transition-colors duration-200 group-hover:text-white/90">
                {r.text}
              </span>
              <ArrowNE className="arr transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HoverImageLinks;


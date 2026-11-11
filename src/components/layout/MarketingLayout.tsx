'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mark } from '@/components/Icons';
import { BookButton } from '@/components/BookButton';
import { closer } from '@/content/site';

export interface MarketingLayoutProps {
  variant?: string;
}

export default function MarketingLayout({ variant }: MarketingLayoutProps) {
  const pathname = usePathname();
  const isBahrain = variant === 'bahrain' || pathname === '/bahrain';

  if (isBahrain) {
    return (
      <div className="w-full max-w-11/12 xl:max-w-6xl mx-auto px-4 sm:px-6 relative z-20">
        <div className="closer relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-[#8C75F7] text-[#0A0712] p-8 sm:p-12 lg:p-16 shadow-sm">
          <Mark className="mk" />
          <div className="relative z-10 max-w-[880px]">
            <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-bold font-sans tracking-tight leading-[110%] text-[#0A0712]">
              Ready to grow your business in Bahrain?
            </h2>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg lg:text-xl text-[#0A0712]/85 max-w-[42em] leading-relaxed">
              From a stronger website to a sharper brand and a digital strategy built to perform, we&apos;re here to turn your next idea into measurable growth.
            </p>
            <div className="cta-row mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <BookButton variant="dark" label="Start Your Project" />
              <Link className="btn btn-ghost" href="/contact">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-11/12 xl:max-w-6xl mx-auto px-4 sm:px-6 relative z-20">
      <div className="closer relative overflow-hidden rounded-3xl sm:rounded-[36px] bg-[#8C75F7] text-[#0A0712] p-8 sm:p-12 lg:py-16 lg:px-14 shadow-sm">
        <Mark className="mk" />
        <div className="relative z-10 max-w-[880px]">
          <h2 className="text-3xl sm:text-5xl lg:text-[64px] font-bold font-sans tracking-tight leading-[1.05] text-[#0A0712]">
            {closer.headline}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-[#0A0712]/85 max-w-[38em] leading-relaxed">
            {closer.subhead}
          </p>
          <div className="cta-row mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <BookButton variant="dark" />
            <Link className="btn btn-ghost" href={closer.secondary.href}>
              {closer.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MarketingLayout };

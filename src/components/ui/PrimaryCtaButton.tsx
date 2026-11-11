'use client';

import React from 'react';
import Link from 'next/link';
import GoArrowUpRight from '@/components/icons/GoArrowUpRight';

export interface PrimaryCtaButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  href?: string;
  className?: string;
  textClassName?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function PrimaryCtaButton({
  text = 'Start Your Project',
  href = '/contact',
  className = '',
  textClassName = '',
  onClick,
  ...props
}: PrimaryCtaButtonProps) {
  const content = (
    <div
      className={`group inline-flex items-center transition-transform duration-200 hover:scale-[1.02] cursor-pointer select-none ${className}`}
      onClick={onClick}
      {...props}
    >
      {/* Teardrop Icon Box */}
      <div className="w-12 h-12 flex items-center justify-center bg-[#8C75F7] rounded-[4px_40px_40px_40px] shadow-[0_-2px_2px_0_rgba(65,27,238,0.25)_inset,0_4px_4px_0_rgba(95,61,255,0.25)] transition-all duration-200 group-hover:bg-[#7B62F0] shrink-0">
        <GoArrowUpRight className="w-5 h-5 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      {/* Main CTA Pill Button */}
      <div className="h-12 px-5 sm:px-6 flex items-center justify-center bg-[#8C75F7] rounded-[100px] shadow-[0_-2px_2px_0_rgba(65,27,238,0.25)_inset,0_4px_4px_0_rgba(95,61,255,0.25)] transition-all duration-200 group-hover:bg-[#7B62F0]">
        <span
          className={`text-white whitespace-nowrap ${
            textClassName || 'font-semibold text-sm sm:text-base'
          }`}
        >
          {text}
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}

export { PrimaryCtaButton };

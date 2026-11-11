'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LinkedInIcon from '@/components/icons/LinkedInIcon';
import XIcon from '@/components/icons/XIcon';
import FacebookIcon from '@/components/icons/FacebookIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import MarketingLayout from '@/components/layout/MarketingLayout';

export interface FooterProps {
  variant?: string;
}

export default function Footer({ variant }: FooterProps) {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data: { country_code?: string }) => setCountry(data.country_code ?? null))
      .catch(() => setCountry(null));
  }, []);

  return (
    <footer
      className="w-full bg-cover bg-bottom bg-no-repeat pt-16 sm:pt-20 lg:pt-24 relative overflow-hidden border-t border-white/10 mt-16 sm:mt-24"
      style={{
        backgroundColor: '#0A0712',
        backgroundImage: `url('/footerImage-dark.png')`,
      }}
    >
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-36 left-1/2 -translate-x-1/2 w-[650px] sm:w-[900px] h-[380px] bg-[#8C75F7]/10 blur-[130px] rounded-full"
        aria-hidden="true"
      />

      {/* Top CTA Banner (Marketing Layout) */}
      <MarketingLayout variant={variant} />

      {/* Main Footer Container */}
      <div className="w-full max-w-11/12 xl:max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 lg:pt-36 pb-8 sm:pb-12 relative z-10">
        {/* ── Top Row: Brand Info, Nav Links, Social Icons ── */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10 lg:gap-12">
          {/* Left: Brand Logo Box & Contact */}
          <div className="flex flex-col items-start gap-4">
            <Link
              href="/"
              className="w-13 h-13 sm:w-14 sm:h-14 bg-white/[0.06] border border-white/10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.4)] flex items-center justify-center p-2.5 transition-all duration-200 hover:scale-105 hover:border-[#8C75F7]/40 hover:bg-white/[0.09]"
              aria-label="FAARNS Homepage"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-black.png"
                alt="FAARNS Logo"
                className="w-8 h-8 object-contain brightness-0 invert"
              />
            </Link>

            <div className="flex flex-col gap-2 text-[16px] text-white/75 font-normal leading-[95%]">
              <a
                href="mailto:faarns@faisal.org"
                className="hover:text-[#A58BFF] transition-colors"
              >
                faarns@faisal.org
              </a>
              {country === 'CA' ? (
                <a
                  href="tel:+16132277949"
                  className="hover:text-[#A58BFF] transition-colors"
                >
                  +1 (613) 227-7949
                </a>
              ) : country === 'GB' ? (
                <a
                  href="tel:+447365617024"
                  className="hover:text-[#A58BFF] transition-colors"
                >
                  +44 7365 617024
                </a>
              ) : (
                <a
                  href="tel:+447365617024"
                  className="hover:text-[#A58BFF] transition-colors"
                >
                  +44 7365 617024
                </a>
              )}
            </div>
          </div>

          {/* Middle: 3 Columns of Navigation Links */}
          <div className="grid grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            {/* Col 1 */}
            <div className="flex flex-col gap-3.5">
              <Link
                href="/services"
                className="text-[18px] font-normal text-white/75 leading-[95%] hover:text-[#A58BFF] transition-colors"
              >
                Services
              </Link>
              <Link
                href="/services/ai-agents"
                className="text-[18px] font-normal text-white/75 leading-[95%] hover:text-[#A58BFF] transition-colors"
              >
                AI Automation
              </Link>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-3.5">
              <Link
                href="/pricing"
                className="text-[18px] font-normal text-white/75 leading-[95%] hover:text-[#A58BFF] transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/careers"
                className="text-[18px] font-normal text-white/75 leading-[95%] hover:text-[#A58BFF] transition-colors"
              >
                Careers
              </Link>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-3.5">
              <Link
                href="/about"
                className="text-[18px] font-normal text-white/75 leading-[95%] hover:text-[#A58BFF] transition-colors"
              >
                About us
              </Link>
              <Link
                href="/contact"
                className="text-[18px] font-normal text-white/75 leading-[95%] hover:text-[#A58BFF] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right: Social Circle Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/faarns"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#A58BFF] hover:text-white hover:bg-[#8C75F7] hover:border-[#8C75F7] shadow-[0px_4px_12px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0px_4px_16px_rgba(140,117,247,0.4)] transition-all duration-200"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>

            <a
              href="https://x.com/Faarns"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#A58BFF] hover:text-white hover:bg-[#8C75F7] hover:border-[#8C75F7] shadow-[0px_4px_12px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0px_4px_16px_rgba(140,117,247,0.4)] transition-all duration-200"
            >
              <XIcon className="w-4 h-4" />
            </a>

            <a
              href="https://www.facebook.com/share/1F4kfXq9zC/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#A58BFF] hover:text-white hover:bg-[#8C75F7] hover:border-[#8C75F7] shadow-[0px_4px_12px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0px_4px_16px_rgba(140,117,247,0.4)] transition-all duration-200"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>

            <a
              href="https://www.instagram.com/faarns.ltd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#A58BFF] hover:text-white hover:bg-[#8C75F7] hover:border-[#8C75F7] shadow-[0px_4px_12px_rgba(0,0,0,0.3)] hover:scale-105 hover:shadow-[0px_4px_16px_rgba(140,117,247,0.4)] transition-all duration-200"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ── Giant FAARNS Wordmark SVG Backdrop ── */}
        <div className="w-full mt-12 sm:mt-16 select-none pointer-events-none">
          <svg
            width="1125"
            height="224"
            viewBox="0 0 1125 224"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0.25586 218.445V3.9453H153.856V40.8453H43.7559V92.4453H137.056V129.645H43.7559V218.445H0.25586ZM143.152 218.445L217.852 3.9453H262.852L338.452 218.445H293.152L278.752 172.845H201.352L187.252 218.445H143.152ZM230.752 77.7453L211.552 139.545H268.252L249.052 77.7453L240.352 44.7453H239.752C236.152 59.1453 233.152 70.1453 230.752 77.7453ZM343.836 218.445L418.536 3.9453H463.536L539.136 218.445H493.836L479.436 172.845H402.036L387.936 218.445H343.836ZM431.436 77.7453L412.236 139.545H468.936L449.736 77.7453L441.036 44.7453H440.436C436.836 59.1453 433.836 70.1453 431.436 77.7453ZM557.189 218.445V3.9453H655.589C676.189 3.9453 692.789 9.4453 705.389 20.4453C718.189 31.4453 724.589 45.8453 724.589 63.6453C724.589 91.0453 711.489 108.345 685.289 115.545V116.445C695.489 119.445 703.089 124.245 708.089 130.845C713.289 137.245 716.589 146.845 717.989 159.645C718.389 164.445 718.789 170.145 719.189 176.745C719.789 183.145 720.189 188.245 720.389 192.045C720.789 195.845 721.189 199.645 721.589 203.445C722.189 207.245 722.889 210.245 723.689 212.445C724.689 214.445 725.889 215.745 727.289 216.345V218.445H685.589C684.789 218.045 684.089 217.345 683.489 216.345C682.889 215.145 682.389 213.545 681.989 211.545C681.589 209.545 681.189 207.545 680.789 205.545C680.589 203.345 680.289 200.645 679.889 197.445C679.689 194.045 679.489 191.145 679.289 188.745C679.089 186.145 678.789 182.845 678.389 178.845C678.189 174.645 677.989 171.345 677.789 168.945C675.989 144.545 661.989 132.345 635.789 132.345H600.689V218.445H557.189ZM600.689 39.0453V98.7453H646.889C658.289 98.7453 666.989 96.0453 672.989 90.6453C679.189 85.2453 682.289 78.1453 682.289 69.3453C682.289 60.3453 679.389 53.0453 673.589 47.4453C667.789 41.8453 659.289 39.0453 648.089 39.0453H600.689ZM752.6 218.445V3.9453H796.7L868.1 123.645C870.1 127.045 872.3 131.245 874.7 136.245C877.3 141.245 879.3 145.445 880.7 148.845L883.1 153.645H883.7C882.9 138.845 882.5 126.445 882.5 116.445V3.9453H925.4V218.445H883.4L810.2 99.9453C808.2 96.5453 805.9 92.4453 803.3 87.6453C800.7 82.6453 798.7 78.4453 797.3 75.0453L794.9 70.2453H794.3C795.1 85.2453 795.5 97.7453 795.5 107.745V218.445H752.6ZM1041.36 223.245C1012.36 223.245 989.864 217.145 973.864 204.945C957.864 192.545 949.464 174.945 948.664 152.145H991.264C992.664 164.945 997.164 174.145 1004.76 179.745C1012.56 185.345 1024.16 188.145 1039.56 188.145C1051.76 188.145 1061.76 185.945 1069.56 181.545C1077.36 176.945 1081.26 169.945 1081.26 160.545C1081.26 157.145 1080.76 154.145 1079.76 151.545C1078.96 148.745 1077.16 146.345 1074.36 144.345C1071.56 142.145 1069.16 140.445 1067.16 139.245C1065.16 137.845 1061.46 136.445 1056.06 135.045C1050.66 133.445 1046.56 132.345 1043.76 131.745C1040.96 130.945 1035.76 129.645 1028.16 127.845C1018.96 125.645 1011.36 123.745 1005.36 122.145C999.564 120.545 993.064 118.045 985.864 114.645C978.864 111.245 973.264 107.545 969.064 103.545C965.064 99.3453 961.664 93.9453 958.864 87.3453C956.064 80.5453 954.664 72.8453 954.664 64.2453C954.664 43.6453 962.164 27.8453 977.164 16.8453C992.364 5.6453 1012.26 0.0452991 1036.86 0.0452991C1061.26 0.0452991 1080.76 5.8453 1095.36 17.4453C1109.96 29.0453 1118.06 45.5453 1119.66 66.9453H1077.96C1076.76 56.5453 1072.36 48.5453 1064.76 42.9453C1057.36 37.3453 1047.96 34.5453 1036.56 34.5453C1024.76 34.5453 1015.36 36.8453 1008.36 41.4453C1001.36 46.0453 997.864 52.1453 997.864 59.7453C997.864 67.9453 1001.26 73.9453 1008.06 77.7453C1015.06 81.5453 1027.26 85.3453 1044.66 89.1453C1055.06 91.3453 1063.56 93.4453 1070.16 95.4453C1076.76 97.2453 1083.86 99.9453 1091.46 103.545C1099.26 106.945 1105.26 110.745 1109.46 114.945C1113.86 119.145 1117.46 124.745 1120.26 131.745C1123.26 138.545 1124.76 146.445 1124.76 155.445C1124.76 176.645 1117.06 193.245 1101.66 205.245C1086.26 217.245 1066.16 223.245 1041.36 223.245Z"
              fill="url(#paint0_linear_552_142)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_552_142"
                x1="559"
                y1="-60.1603"
                x2="559"
                y2="218.121"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="white" stopOpacity="0.15" />
                <stop offset="0.6" stopColor="white" stopOpacity="0.06" />
                <stop offset="1" stopColor="white" stopOpacity="0.01" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ── Bottom Bar: Copyright & Legal Links ── */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10 text-[14px] text-white/60 font-normal leading-[21.6px]">
          <p>© 2026 FAARNS, all rights reserved</p>
          <div className="flex items-center gap-1.5">
            <Link
              href="/terms-of-services"
              className="text-white/60 hover:text-[#A58BFF] transition-colors cursor-pointer"
            >
              Terms of services
            </Link>
            <span className="text-white/20 px-1">|</span>
            <Link
              href="/privacy-policy"
              className="text-white/60 hover:text-[#A58BFF] transition-colors cursor-pointer"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };

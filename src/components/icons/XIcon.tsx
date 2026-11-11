import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function XIcon({
  size,
  width = size,
  height = size,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      viewBox="0 0 21 20"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <mask
        id="mask0_561_57"
        style={{ maskType: "luminance" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="20"
      >
        <path d="M0.744141 0.120117H20.0791V19.455H0.744141V0.120117Z" fill="white" />
      </mask>
      <g mask="url(#mask0_561_57)">
        <path
          d="M15.9704 1.02637H18.9355L12.4583 8.44822L20.0791 18.5493H14.1129L9.43657 12.4243L4.09185 18.5493H1.12393L8.05136 10.6082L0.744141 1.02775H6.86226L11.0828 6.62521L15.9704 1.02637ZM14.9277 16.7705H16.5712L5.96457 2.71265H4.20233L14.9277 16.7705Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export { XIcon };

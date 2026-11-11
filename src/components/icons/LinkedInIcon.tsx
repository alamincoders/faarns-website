import type { SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export default function LinkedInIcon({
  size,
  width = size || 18,
  height = size || 18,
  className,
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.4902 4.48528C3.59505 4.48528 4.47894 3.58759 4.47894 2.49655C4.47894 1.40551 3.58124 0.507812 2.4902 0.507812C1.39916 0.507812 0.501465 1.40551 0.501465 2.49655C0.501465 3.58759 1.39916 4.48528 2.4902 4.48528ZM6.371 5.99065V17.0668H9.79604V11.5978C9.79604 10.1477 10.0723 8.75278 11.8538 8.75278C13.6354 8.75278 13.6354 10.4101 13.6354 11.6806V17.0668H17.0743V10.9901C17.0743 8.007 16.439 5.71443 12.9587 5.71443C11.2876 5.71443 10.1689 6.62594 9.71318 7.49601H9.67175V5.97684H6.38481L6.371 5.99065ZM0.777678 5.99065H4.21653V17.0668H0.777678V5.99065Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { LinkedInIcon };

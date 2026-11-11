export const MARK_PATHS = [
  "M422 341H950L876 489H506Z",
  "M540 532H855L785 677H624L448 942L376 796Z",
  "M455 535H501L356 751L336 716Z",
];

export function Mark({ className, outline = false }: { className?: string; outline?: boolean }) {
  return (
    <svg className={className} viewBox="330 335 625 612" aria-hidden="true">
      {MARK_PATHS.map((d) =>
        outline ? <path key={d} d={d} fill="none" stroke="currentColor" strokeWidth={2} /> : <path key={d} d={d} fill="currentColor" />,
      )}
    </svg>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowNE({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

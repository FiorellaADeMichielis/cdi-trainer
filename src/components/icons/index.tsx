import React from 'react';

export interface SvgIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
  ariaHidden?: boolean;
  ariaLabel?: string;
}

const defaultProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconArrowRight: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const IconArrowLeft: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M19 12H5" />
    <path d="m12 19-7-7 7-7" />
  </svg>
);

export const IconArrowUp: React.FC<SvgIconProps> = ({
  className = 'size-4',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export const IconArrowDown: React.FC<SvgIconProps> = ({
  className = 'size-4',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconCheck: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const IconCheckCircle: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export const IconClose: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const IconCloseCircle: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

export const IconSearch: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const IconCalendar: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

export const IconClock: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const IconPlay: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    fill="currentColor"
    stroke="none"
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

export const IconBook: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
  </svg>
);

export const IconEye: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconWarning: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </svg>
);

export const IconAlertCircle: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

export const IconHelp: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </svg>
);

export const IconFlame: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    fill="currentColor"
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export const IconTrophy: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export const IconAward: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

export const IconVolume: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

export const IconVolumeMute: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="22" x2="16" y1="9" y2="15" />
    <line x1="16" x2="22" y1="9" y2="15" />
  </svg>
);

export const IconRotate: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

export const IconGraduationCap: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </svg>
);

export const IconSparkles: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

export const IconZap: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

export const IconGamepad: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <line x1="6" x2="10" y1="12" y2="12" />
    <line x1="8" x2="8" y1="10" y2="14" />
    <line x1="15" x2="15.01" y1="13" y2="13" />
    <line x1="18" x2="18.01" y1="11" y2="11" />
    <rect width="20" height="12" x="2" y="6" rx="6" />
  </svg>
);

export const IconListOrdered: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <line x1="10" x2="21" y1="6" y2="6" />
    <line x1="10" x2="21" y1="12" y2="12" />
    <line x1="10" x2="21" y1="18" y2="18" />
    <path d="M4 6h1v4" />
    <path d="M4 10h2" />
    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
  </svg>
);

export const IconGrid: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

export const IconShieldAlert: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

export const IconShieldCheck: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IconLightbulb: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

export const IconTrendingUp: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

export const IconChart: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    {...defaultProps}
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <line x1="18" x2="18" y1="20" y2="10" />
    <line x1="12" x2="12" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="14" />
  </svg>
);

export const IconIntegral: React.FC<SvgIconProps> = ({
  className = 'size-6',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <path d="M16 4c-2 0-3.5 1-4 3.5L10 16.5C9.5 19 8 20 6 20" />
  </svg>
);

export const IconUnneEmblem: React.FC<SvgIconProps> = ({
  className = 'size-8',
  ariaHidden = true,
  ariaLabel = 'Emblema Oficial Cátedra CDI UNNE FaCENA',
  ...props
}) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    {/* Outer Academic Seal / Ring */}
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" className="opacity-60" />
    <circle cx="16" cy="16" r="11.5" stroke="currentColor" strokeWidth="1.2" />
    {/* Coordinate Axes */}
    <line x1="8" y1="16" x2="24" y2="16" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 1.5" className="opacity-40" />
    <line x1="16" y1="8" x2="16" y2="24" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 1.5" className="opacity-40" />
    {/* Academic Sunburst Rays */}
    <circle cx="16" cy="5" r="0.8" fill="currentColor" />
    <circle cx="27" cy="16" r="0.8" fill="currentColor" />
    <circle cx="16" cy="27" r="0.8" fill="currentColor" />
    <circle cx="5" cy="16" r="0.8" fill="currentColor" />
    {/* Prominent Mathematical Integral Curve */}
    <path
      d="M20 9.5c-2.2 0-3.8 1.4-4.2 3.8L14.2 19c-.4 2.4-2 3.8-4.2 3.8"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
);

export const IconCertificate: React.FC<SvgIconProps> = ({
  className = 'size-5',
  ariaHidden = true,
  ariaLabel,
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden={ariaHidden}
    aria-label={ariaLabel}
    {...props}
  >
    <rect width="18" height="14" x="3" y="3" rx="2" />
    <path d="m8 21 4-3 4 3V15H8v6Z" />
    <circle cx="12" cy="9" r="2" />
  </svg>
);



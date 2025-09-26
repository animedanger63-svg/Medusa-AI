import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="Medusa AI Logo"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#a855f7" /> {/* purple-500 */}
          <stop offset="100%" stopColor="#22d3ee" /> {/* cyan-400 */}
        </linearGradient>
      </defs>
      <path 
        d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" 
        stroke="url(#logoGradient)" 
        strokeWidth="1.5"
      />
      <path 
        d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7Z" 
        stroke="url(#logoGradient)" 
        strokeWidth="1.5"
      />
      <path d="M12 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19.0711 4.92896L17.6569 6.34317" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.34315 17.6569L4.92893 19.0711" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19.0711 19.0711L17.6569 17.6569" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.34315 6.34315L4.92893 4.92893" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

export default Logo;

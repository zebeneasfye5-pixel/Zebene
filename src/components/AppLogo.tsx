import React from 'react';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showGlow?: boolean;
}

export const AppLogo: React.FC<Props> = ({
  size = 'md',
  className = '',
  showGlow = true,
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-[#070b14] border border-cyan-400/40 shadow-inner ${
        showGlow ? 'shadow-[0_0_15px_rgba(34,211,238,0.25)]' : ''
      } ${sizeClasses} ${className}`}
      title="oneworld Sovereign Emblem - Founded by Zebene Asfaye"
    >
      {/* Official User-Provided Celestial Emblem */}
      <img
        src="/assets/aistudio/Screenshot_20261029-070405_Chrome_8eeacb5b.jpg"
        alt="oneworld Official Emblem"
        className="w-full h-full object-cover scale-[1.85] translate-y-[2%] select-none pointer-events-none"
        loading="eager"
      />

      {/* Orbiting Subtle Glow Ring */}
      <div className="absolute inset-0 rounded-full border border-amber-400/20 pointer-events-none" />
    </div>
  );
};

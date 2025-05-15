
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className }) => {
  return (
    <div className={cn('fixed inset-0 -z-10 overflow-hidden bg-mesh-gradient', className)}>
      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-futuristic-purple/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-futuristic-blue/20 rounded-full blur-3xl animate-pulse-glow [animation-delay:1s]" />
      <div className="absolute top-2/3 left-1/4 w-64 h-64 bg-futuristic-magenta/20 rounded-full blur-3xl animate-pulse-glow [animation-delay:2s]" />
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxwYXRoIGQ9Ik0gNTAgMCBMIDAgMCAwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTU1LCAxMzUsIDI0NSwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')]" />
    </div>
  );
};

export default AnimatedBackground;

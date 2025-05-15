
import React from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';

const CardLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mesh-gradient">
      <AnimatedBackground />
      <div className="glass-morphism rounded-xl border border-white/20 p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
          <h1 className="text-xl font-semibold text-white mb-2">Chargement de la carte...</h1>
          <p className="text-white/70">Veuillez patienter un instant</p>
        </div>
      </div>
    </div>
  );
};

export default CardLoading;

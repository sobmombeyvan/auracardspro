
import React from 'react';

interface BioSectionProps {
  bio: string;
}

const BioSection: React.FC<BioSectionProps> = ({ bio }) => {
  if (!bio) return null;
  
  return (
    <div className="glass-morphism rounded-xl border border-white/20 p-6 hover:border-white/30 transition-all">
      <h2 className="text-xl font-semibold text-gradient mb-4">À propos</h2>
      <p className="text-white/80 leading-relaxed whitespace-pre-line">{bio}</p>
    </div>
  );
};

export default BioSection;

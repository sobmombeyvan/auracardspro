
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';

const CardNotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mesh-gradient">
      <AnimatedBackground />
      <div className="glass-morphism rounded-xl border border-white/20 p-8 text-center max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gradient mb-4">Carte introuvable</h1>
        <p className="text-white/70 mb-6">
          La carte que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <div className="flex flex-col space-y-4">
          <Link to="/">
            <Button className="w-full">Retour à l'accueil</Button>
          </Link>
          <Link to="/create">
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              Créer une carte
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardNotFound;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CreateCardCTA: React.FC = () => {
  return (
    <div className="glass-morphism rounded-xl border border-white/20 p-6">
      <h2 className="text-xl font-semibold text-gradient mb-2">Vous aimez cette carte ?</h2>
      <p className="text-white/70 mb-4">Créez votre propre carte digitale en quelques minutes</p>
      <Link to="/create">
        <Button className="bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple">
          Créer ma carte
        </Button>
      </Link>
    </div>
  );
};

export default CreateCardCTA;

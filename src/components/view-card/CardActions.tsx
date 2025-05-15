
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, User } from 'lucide-react';

interface CardActionsProps {
  handleAddToContacts: () => void;
}

const CardActions: React.FC<CardActionsProps> = ({
  handleAddToContacts
}) => {
  return (
    <div className="glass-morphism rounded-xl border border-white/20 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gradient mb-4">Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-morphism rounded-lg p-4 border border-white/10 hover:border-white/30 transition-all">
          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-futuristic from-futuristic-purple to-futuristic-blue flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">Ajouter aux contacts</h3>
              <p className="text-white/60 text-sm mb-3">Enregistrer ces informations</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={handleAddToContacts}
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
        
        <div className="glass-morphism rounded-lg p-4 border border-white/10 hover:border-white/30 transition-all">
          <div className="flex space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-futuristic from-futuristic-purple to-futuristic-blue flex items-center justify-center shrink-0">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">Format vCard</h3>
              <p className="text-white/60 text-sm mb-3">Télécharger au format standard</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-white/20 text-white hover:bg-white/10"
                onClick={handleAddToContacts}
              >
                Télécharger
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardActions;

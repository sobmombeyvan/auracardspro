import React from 'react';
import { BusinessCard } from '@/components/ui/business-card';
import { Button } from '@/components/ui/button';

interface CardPreviewProps {
  cardData: any;
  socials: any[];
  selectedTemplate: 'default' | 'minimal' | 'gradient' | 'dark' | 'elegant' | 'modern';
  setSelectedTemplate: ((template: 'default' | 'minimal' | 'gradient' | 'dark' | 'elegant' | 'modern') => void) | null;
  qrCode?: string | null;
  onAddToContacts?: () => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  cardData,
  socials,
  selectedTemplate,
  setSelectedTemplate,
  qrCode,
  onAddToContacts
}) => {
  return (
    <div>
      {setSelectedTemplate && (
        <div className="glass-morphism rounded-xl border border-white/20 p-4 mb-4">
          <h3 className="text-white text-sm font-medium mb-3">Choisir un modèle</h3>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              variant={selectedTemplate === 'default' ? "default" : "outline"} 
              className={selectedTemplate === 'default' ? "bg-purple-600" : "border-white/20 text-white"} 
              onClick={() => setSelectedTemplate('default')}
              size="sm"
            >
              Futuriste
            </Button>
            <Button 
              variant={selectedTemplate === 'minimal' ? "default" : "outline"} 
              className={selectedTemplate === 'minimal' ? "bg-purple-600" : "border-white/20 text-white"} 
              onClick={() => setSelectedTemplate('minimal')}
              size="sm"
            >
              Minimal
            </Button>
            <Button 
              variant={selectedTemplate === 'gradient' ? "default" : "outline"} 
              className={selectedTemplate === 'gradient' ? "bg-purple-600" : "border-white/20 text-white"} 
              onClick={() => setSelectedTemplate('gradient')}
              size="sm"
            >
              Gradient
            </Button>
            <Button 
              variant={selectedTemplate === 'dark' ? "default" : "outline"} 
              className={selectedTemplate === 'dark' ? "bg-purple-600" : "border-white/20 text-white"} 
              onClick={() => setSelectedTemplate('dark')}
              size="sm"
            >
              Dark
            </Button>
            <Button 
              variant={selectedTemplate === 'elegant' ? "default" : "outline"} 
              className={selectedTemplate === 'elegant' ? "bg-purple-600" : "border-white/20 text-white"} 
              onClick={() => setSelectedTemplate('elegant')}
              size="sm"
            >
              Élégant
            </Button>
            <Button 
              variant={selectedTemplate === 'modern' ? "default" : "outline"} 
              className={selectedTemplate === 'modern' ? "bg-purple-600" : "border-white/20 text-white"} 
              onClick={() => setSelectedTemplate('modern')}
              size="sm"
            >
              Moderne
            </Button>
          </div>
        </div>
      )}
      
      <BusinessCard 
        name={cardData.name}
        title={cardData.title}
        phone={cardData.phone}
        email={cardData.email}
        location={cardData.location || ''}
        website={cardData.website}
        photo={cardData.photo_url}
        logo={cardData.logo_url}
        socials={socials.map(s => ({ 
          network: s.network as any, 
          url: s.url 
        }))}
        variant={selectedTemplate}
        qrUrl={qrCode}
        onAddToContacts={onAddToContacts}
      />
    </div>
  );
};

export default CardPreview;

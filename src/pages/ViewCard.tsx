import React from 'react';
import { Link, useParams } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Import refactored components and hooks
import CardPreview from '@/components/view-card/CardPreview';
import CardActions from '@/components/view-card/CardActions';
import BioSection from '@/components/view-card/BioSection';
import ContactInformation from '@/components/view-card/ContactInformation';
import PortfolioSection from '@/components/view-card/PortfolioSection';
import CreateCardCTA from '@/components/view-card/CreateCardCTA';
import CardLoading from '@/components/view-card/CardLoading';
import CardNotFound from '@/components/view-card/CardNotFound';
import ViewCardFooter from '@/components/view-card/ViewCardFooter';
import { useCardData } from '@/hooks/useCardData';
import { createAndDownloadVCard } from '@/utils/vCardGenerator';

const ViewCard = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, cardData, socials, portfolioItems, selectedTemplate, qrCode } = useCardData(id);
  
  if (loading) {
    return <CardLoading />;
  }
  
  if (!cardData) {
    return <CardNotFound />;
  }

  const handleAddToContacts = () => {
    createAndDownloadVCard(cardData);
  };

  const handleLocationClick = () => {
    // Check if the user has location data
    if (!cardData.location) {
      toast({
        title: "Aucune localisation",
        description: "Cette carte n'a pas d'adresse définie",
        variant: "destructive"
      });
      return;
    }
    
    // Open Google Maps with the location
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cardData.location)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-mesh-gradient">
      <AnimatedBackground />
      
      {/* Back Navigation */}
      <div className="container mx-auto px-4 pt-6">
        <Link to="/" className="text-white/70 hover:text-white flex items-center space-x-2 w-max">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Retour</span>
        </Link>
      </div>
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Card Preview Section */}
              <div className="lg:col-span-2">
                <CardPreview 
                  cardData={cardData}
                  socials={socials}
                  selectedTemplate={selectedTemplate}
                  setSelectedTemplate={null} // Remove template selection in view mode
                  qrCode={qrCode}
                  onAddToContacts={handleAddToContacts}
                />
                
                {/* Location Button */}
                <div className="mt-4">
                  <Button 
                    onClick={handleLocationClick}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Voir la localisation
                  </Button>
                </div>
              </div>
              
              {/* Details Section */}
              <div className="lg:col-span-3 space-y-8">
                {/* Card Actions */}
                <CardActions handleAddToContacts={handleAddToContacts} />
                
                {/* Bio Section */}
                <BioSection bio={cardData.bio || ''} />
                
                {/* Contact Information */}
                <ContactInformation 
                  email={cardData.email}
                  phone={cardData.phone}
                  website={cardData.website}
                  location={cardData.location}
                  socials={socials}
                />
                
                {/* Portfolio Section */}
                <PortfolioSection portfolioItems={portfolioItems} />

                {/* Create your own card CTA */}
                <CreateCardCTA />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <ViewCardFooter />
    </div>
  );
};

export default ViewCard;

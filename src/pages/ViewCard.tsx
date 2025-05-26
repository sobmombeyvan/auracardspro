import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

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

type BusinessCard = {
  id: string;
  name: string;
  title: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  bio: string | null;
  photo_url: string | null;
  template: string;
  published: boolean | null;
  slug: string | null;
  location: string | null;
  socials?: any[];
  portfolioItems?: any[];
  qrCode?: string;
  theme?: 'default' | 'minimal' | 'gradient' | 'dark' | 'elegant' | 'modern';
};

const ViewCard = () => {
  const { slug } = useParams<{ slug: string }>();
  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCard(slugParam: string) {
      try {
        console.log('Current URL:', window.location.href);
        console.log('Slug from params:', slugParam);
        console.log('Attempting to fetch card with slug:', slugParam);

        if (!slugParam) {
          console.error('No slug found in URL');
          setError('URL invalide');
          setLoading(false);
          return;
        }

        // First, check if the card exists at all
        const { data: allCards, error: listError } = await supabase
          .from('business_cards')
          .select('id, slug, published')
          .eq('slug', slugParam);

        console.log('All cards with this slug:', allCards);
        console.log('List error:', listError);

        // Try to find the card by slug first
        let { data: cardData, error: cardError } = await supabase
          .from('business_cards')
          .select('*')
          .eq('slug', slugParam)
          .eq('published', true)
          .single();

        console.log('Raw query result:', { cardData, cardError });
        console.log('Query details:', {
          table: 'business_cards',
          filters: {
            slug: slugParam,
            published: true
          }
        });

        if (cardError) {
          console.error('Error details:', {
            code: cardError.code,
            message: cardError.message,
            details: cardError.details,
            hint: cardError.hint
          });
        }

        // If not found by slug, try to find by ID
        if (cardError && cardError.code === 'PGRST116') {
          console.log('Card not found by slug, trying by ID');
          const { data: cardById, error: idError } = await supabase
            .from('business_cards')
            .select('*')
            .eq('id', slugParam)
            .eq('published', true)
            .single();

          console.log('Search by ID result:', { cardById, idError });

          if (idError) {
            console.error('Error searching by ID:', idError);
            throw new Error('Carte non trouvée');
          }

          cardData = cardById;
        } else if (cardError) {
          console.error('Error searching by slug:', cardError);
          throw cardError;
        }

        if (!cardData) {
          console.error('No card data found after all attempts');
          throw new Error('Carte non trouvée');
        }

        // Transform the data to match our BusinessCard type
        const transformedCard: BusinessCard = {
          id: cardData.id,
          name: cardData.name,
          title: cardData.title,
          email: cardData.email,
          phone: cardData.phone,
          website: cardData.website,
          bio: cardData.bio,
          photo_url: cardData.photo_url,
          template: cardData.template,
          published: true, // Force published to true for public access
          slug: cardData.slug,
          location: cardData.location || null,
          theme: (cardData.template as BusinessCard['theme']) || 'default',
          socials: [],
          portfolioItems: []
        };

        console.log('Final transformed card:', transformedCard);
        setCard(transformedCard);
      } catch (err) {
        console.error('Error in fetchCard:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchCard(slug);
    } else {
      setError('URL invalide');
      setLoading(false);
    }
  }, [slug]);

  if (loading) {
    return <CardLoading />;
  }

  if (error || !card) {
    return <CardNotFound />;
  }

  const handleAddToContacts = () => {
    if (card) {
      createAndDownloadVCard(card);
    }
  };

  const handleLocationClick = () => {
    if (!card.location) {
      toast({
        title: "Aucune localisation",
        description: "Cette carte n'a pas d'adresse définie",
        variant: "destructive"
      });
      return;
    }
    
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.location)}`, '_blank');
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
                  cardData={card}
                  socials={card.socials || []}
                  selectedTemplate={card.theme || 'default'}
                  setSelectedTemplate={null}
                  qrCode={card.qrCode}
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
                {card.bio && <BioSection bio={card.bio} />}
                
                {/* Contact Information */}
                <ContactInformation
                  email={card.email}
                  phone={card.phone}
                  website={card.website}
                  location={card.location}
                  socials={card.socials || []}
                />
                
                {/* Portfolio Section */}
                {card.portfolioItems && card.portfolioItems.length > 0 && (
                  <PortfolioSection portfolioItems={card.portfolioItems} />
                )}

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

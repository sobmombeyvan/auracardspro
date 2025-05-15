import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { generateQRCode } from '@/utils/qrCodeGenerator';

interface CardData {
  id?: string;
  name: string;
  title?: string;
  bio?: string;
  email?: string;
  phone?: string;
  website?: string;
  photo_url?: string;
  logo_url?: string;
  location?: string;
  template: 'default' | 'minimal' | 'gradient' | 'dark' | 'elegant' | 'modern';
  published?: boolean;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
}

interface SocialLink {
  id?: string;
  network: string;
  url: string;
  card_id?: string;
}

interface PortfolioItem {
  id?: string;
  title: string;
  description?: string;
  link?: string;
  image_url?: string;
  card_id?: string;
}

interface UseCardDataResult {
  loading: boolean;
  cardData: CardData | null;
  socials: SocialLink[];
  portfolioItems: PortfolioItem[];
  selectedTemplate: 'default' | 'minimal' | 'gradient' | 'dark' | 'elegant' | 'modern';
  qrCode: string | null;
}

export const useCardData = (cardId: string | undefined): UseCardDataResult => {
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [socials, setSocials] = useState<SocialLink[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<'default' | 'minimal' | 'gradient' | 'dark' | 'elegant' | 'modern'>('default');
  const [qrCode, setQrCode] = useState<string | null>(null);
  
  useEffect(() => {
    if (cardId) {
      fetchCardData(cardId);
      generateAndSetQRCode(cardId);
    }
  }, [cardId]);
  
  const generateAndSetQRCode = async (id: string) => {
    try {
      const qrCodeUrl = await generateQRCode(id);
      setQrCode(qrCodeUrl);
    } catch (error) {
      console.error('Error setting QR code:', error);
    }
  };
  
  const fetchCardData = async (id: string) => {
    try {
      setLoading(true);
      
      // Fetch card data
      const { data: card, error: cardError } = await supabase
        .from('business_cards')
        .select('*')
        .eq('id', id)
        .single();
      
      if (cardError) throw cardError;
      
      // Fetch social links
      const { data: socialLinks, error: socialsError } = await supabase
        .from('social_links')
        .select('*')
        .eq('card_id', id);
      
      if (socialsError) throw socialsError;
      
      // Fetch portfolio items
      const { data: portfolio, error: portfolioError } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('card_id', id);
      
      if (portfolioError) throw portfolioError;
      
      // Set card data - need to make sure template is properly cast to the correct type
      setCardData({
        ...card,
        template: (card.template as 'default' | 'minimal' | 'gradient' | 'dark' | 'elegant' | 'modern') || 'default'
      });
      
      setSocials(socialLinks || []);
      setPortfolioItems(portfolio || []);
      
      // Record this visit
      await supabase
        .from('card_visits')
        .insert({
          card_id: id,
          visitor_ip: null,
          user_agent: navigator.userAgent
        });
      
      if (card.template) {
        setSelectedTemplate(card.template as 'default' | 'minimal' | 'gradient' | 'dark' | 'elegant' | 'modern');
      }
      
    } catch (error: any) {
      console.error('Error fetching card data:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les données de la carte",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    cardData,
    socials,
    portfolioItems,
    selectedTemplate,
    qrCode
  };
};

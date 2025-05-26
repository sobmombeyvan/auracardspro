import { supabase } from '@/integrations/supabase/client';

/**
 * Generates a QR code for a given card ID
 * @param cardId - The ID of the business card
 * @returns A Promise that resolves to the URL of the generated QR code
 */
export const generateQRCode = async (cardId: string): Promise<string> => {
  try {
    // First, get the card's slug from the database
    const { data: card, error } = await supabase
      .from('business_cards')
      .select('slug')
      .eq('id', cardId)
      .single();

    if (error || !card?.slug) {
      throw new Error('Impossible de trouver le slug de la carte');
    }

    // Create the URL for the business card using the slug
    const cardUrl = `${window.location.origin}/c/${card.slug}`;
    
    // Use a free QR code generation service
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cardUrl)}`;
    
    return qrCodeUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

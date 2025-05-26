import { supabase } from '@/integrations/supabase/client';

/**
 * Generates a QR code for a given card ID
 * @param cardId - The ID of the business card
 * @returns A Promise that resolves to the URL of the generated QR code
 */
export const generateQRCode = async (cardId: string): Promise<string> => {
  try {
    // Get the card's slug from the database
    const { data: card, error } = await supabase
      .from('business_cards')
      .select('slug')
      .eq('id', cardId)
      .single();

    if (error) throw error;
    if (!card) throw new Error('Card not found');

    // Generate QR code with the correct URL format
    const cardUrl = `${window.location.origin}/c/${card.slug}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cardUrl)}`;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

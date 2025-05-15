
/**
 * Generates a QR code for a given card ID
 * @param cardId - The ID of the business card
 * @returns A Promise that resolves to the URL of the generated QR code
 */
export const generateQRCode = async (cardId: string): Promise<string> => {
  try {
    // Create the URL for the business card
    const cardUrl = `${window.location.origin}/card/${cardId}`;
    
    // Use a free QR code generation service
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cardUrl)}`;
    
    return qrCodeUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

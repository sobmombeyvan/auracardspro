import { toast } from '@/hooks/use-toast';

interface VCardData {
  name: string;
  title?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
}

/**
 * Creates and downloads a vCard file from the provided data
 * @param cardData - The business card data to use for the vCard
 */
export const createAndDownloadVCard = (cardData: VCardData): void => {
  if (!cardData.name) {
    toast({
      variant: "destructive",
      title: "Erreur",
      description: "Données de carte incomplètes",
    });
    return;
  }

  // Create vCard data
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${cardData.name}`,
    cardData.title ? `TITLE:${cardData.title}` : '',
    cardData.email ? `EMAIL:${cardData.email}` : '',
    cardData.phone ? `TEL:${cardData.phone}` : '',
    cardData.website ? `URL:https://${cardData.website}` : '',
    cardData.location ? `ADR:;;${cardData.location}` : '',
    'END:VCARD'
  ].join('\n');
  
  // Create a blob and download it
  const blob = new Blob([vCardData], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${cardData.name}.vcf`;
  link.click();
  URL.revokeObjectURL(url);
  
  toast({
    title: "Contact ajouté",
    description: "Le fichier vCard a été téléchargé"
  });
};

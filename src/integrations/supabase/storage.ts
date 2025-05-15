
import { supabase } from "./client";

export const BUCKET_NAME = "portfolio-images";

export const uploadPortfolioImage = async (
  file: File,
  cardId: string
): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${cardId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      throw error;
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);
      
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error in uploadPortfolioImage:', error);
    return null;
  }
};

export const getPortfolioImages = async (cardId: string) => {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .list(cardId, {
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error('Error listing portfolio images:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in getPortfolioImages:', error);
    return [];
  }
};

export const deletePortfolioImage = async (path: string) => {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      console.error('Error deleting portfolio image:', error);
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error in deletePortfolioImage:', error);
    return false;
  }
};

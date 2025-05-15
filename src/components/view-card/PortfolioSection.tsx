
import React, { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

interface PortfolioItem {
  title: string;
  description?: string;
  image_url?: string;
  link?: string;
}

interface PortfolioSectionProps {
  portfolioItems: PortfolioItem[];
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolioItems }) => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  
  if (portfolioItems.length === 0) return null;
  
  const handleImageClick = (imageUrl: string) => {
    setExpandedImage(imageUrl);
  };
  
  const closeExpandedImage = () => {
    setExpandedImage(null);
  };
  
  return (
    <div className="glass-morphism rounded-xl border border-white/20 p-6 hover:border-white/30 transition-all">
      <h2 className="text-xl font-semibold text-gradient mb-4">Portfolio</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolioItems.map((item, index) => (
          <div key={index} className="glass-morphism rounded-lg border border-white/10 overflow-hidden hover:border-white/30 transition-all hover:shadow-lg hover:transform hover:scale-[1.01]">
            {item.image_url && (
              <div 
                className="aspect-video w-full cursor-pointer relative overflow-hidden group"
                onClick={() => item.image_url && handleImageClick(item.image_url)}
              >
                <img 
                  src={item.image_url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-sm font-medium">Voir l'image</span>
                </div>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-medium text-white text-lg mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-white/60 text-sm mb-3">{item.description}</p>
              )}
              {item.link && (
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-futuristic-purple hover:text-futuristic-blue transition-colors"
                >
                  <span className="mr-1">Voir le projet</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Image Preview Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 sm:p-8"
          onClick={closeExpandedImage}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh] flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 bg-black/60 p-2 rounded-full z-10 text-white hover:bg-black/80"
              onClick={closeExpandedImage}
            >
              <X size={20} />
            </button>
            <img 
              src={expandedImage} 
              alt="Preview" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSection;

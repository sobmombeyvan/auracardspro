import React from 'react';
import { SocialIcons } from '@/components/SocialIcons';
import { Mail, Phone, Link as LinkIcon, MapPin } from 'lucide-react';

interface ContactInformationProps {
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  socials: any[];
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  email,
  phone,
  website,
  location,
  socials,
}) => {
  return (
    <div className="glass-morphism rounded-xl border border-white/20 p-6">
      <h2 className="text-xl font-semibold text-gradient mb-4">Informations de Contact</h2>
      
      <div className="space-y-4">
        {email && (
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-futuristic from-futuristic-purple to-futuristic-blue flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Email</p>
              <a 
                href={`mailto:${email}`} 
                className="text-white hover:text-futuristic-purple transition-colors"
              >
                {email}
              </a>
            </div>
          </div>
        )}
        
        {location && (
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-futuristic from-futuristic-purple to-futuristic-blue flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Location</p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-futuristic-purple transition-colors"
              >
                {location}
              </a>
            </div>
          </div>
        )}
        
        {phone && (
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-futuristic from-futuristic-purple to-futuristic-blue flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Téléphone</p>
              <a 
                href={`tel:${phone}`} 
                className="text-white hover:text-futuristic-purple transition-colors"
              >
                {phone}
              </a>
            </div>
          </div>
        )}
        
        {website && (
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-futuristic from-futuristic-purple to-futuristic-blue flex items-center justify-center shrink-0">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Site Web</p>
              <a 
                href={`https://${website}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-futuristic-purple transition-colors"
              >
                {website}
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Social Media - Social icons with names below */}
      {socials.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <h3 className="font-medium text-white mb-4">Réseaux Sociaux</h3>
          <SocialIcons 
            profiles={socials.map(s => ({ network: s.network, url: s.url }))}
            size={28}
            layout="grid"
            showNames={true}
            className="grid-cols-2 sm:grid-cols-3 gap-y-4"
          />
        </div>
      )}
    </div>
  );
};

export default ContactInformation;

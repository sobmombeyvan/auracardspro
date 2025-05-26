import React from 'react';
import { cn } from '@/lib/utils';
import { SocialIcon, SocialNetwork } from '@/components/SocialIcons';
import { Phone, Mail, Link as LinkIcon, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BusinessCardProps {
  name: string;
  title: string;
  phone?: string;
  email?: string;
  website?: string;
  location?: string;
  photo?: string;
  logo?: string;
  socials?: SocialLink[];
  className?: string;
  variant?: 'default' | 'preview' | 'minimal' | 'gradient' | 'dark' | 'elegant' | 'modern';
  showQrCode?: boolean;
  qrUrl?: string | null;
  onAddToContacts?: () => void;
}

interface SocialLink {
  network: SocialNetwork;
  url: string;
}

export const BusinessCard = ({
  name,
  title,
  phone,
  email,
  website,
  location,
  photo,
  logo,
  socials = [],
  className,
  variant = 'default',
  showQrCode = true,
  qrUrl = null,
  onAddToContacts,
}: BusinessCardProps) => {
  const getCardStyle = () => {
    switch (variant) {
      case 'minimal':
        return "bg-white text-black shadow-lg border border-gray-100";
      case 'gradient':
        return "bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white";
      case 'dark':
        return "bg-gray-900 text-white border border-gray-800";
      case 'elegant':
        return "bg-black text-white";
      case 'modern':
        return "bg-gradient-to-br from-futuristic-blue to-futuristic-magenta text-white";
      case 'default':
      case 'preview':
      default:
        return "glass-morphism border border-white/20";
    }
  };

  return (
    <div 
      className={cn(
        "relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl",
        variant === 'default' 
          ? "w-full max-w-md p-6" 
          : "w-full h-full p-4",
        getCardStyle(),
        className
      )}
    >
      {variant === 'default' && (
        <>
          <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-futuristic-purple/30 blur-xl animate-pulse" />
          <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-futuristic-blue/30 blur-xl animate-pulse" />
        </>
      )}
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Photo and Logo */}
        <div className="mb-4 relative group">
          {photo ? (
            <div className="relative transform transition-transform duration-300 group-hover:scale-105">
              <img 
                src={photo} 
                alt={name} 
                className="w-24 h-24 object-cover rounded-full border-2 border-white/20 glow"
              />
              {logo && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white p-1 border-2 border-white/20 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  <img 
                    src={logo} 
                    alt="Logo" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-futuristic-purple to-futuristic-magenta shadow-lg glow grid place-items-center relative transform transition-transform duration-300 group-hover:scale-105">
              <span className="text-2xl font-bold text-white">
                {name.charAt(0)}
              </span>
              {logo && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-white p-1 border-2 border-white/20 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  <img 
                    src={logo} 
                    alt="Logo" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Name and Title */}
        <h2 className={cn(
          "text-2xl font-bold text-center mb-1 transform transition-all duration-300 hover:scale-105",
          variant === 'default' ? "text-gradient" : ""
        )}>{name}</h2>
        <p className={cn(
          "text-center mb-4",
          variant === 'default' ? "text-white/80" : (variant === 'minimal' ? "text-gray-600" : "text-white/80")
        )}>{title}</p>
        
        {/* Action Button - "Add to contacts" directly below profile */}
        <div className="w-full mb-6">
          <Button 
            className={cn(
              "w-full transform transition-all duration-300 hover:scale-105", 
              variant === 'minimal' 
                ? "bg-black text-white hover:bg-gray-800" 
                : "bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple text-white"
            )}
            onClick={onAddToContacts}
          >
            Ajouter aux contacts
          </Button>
        </div>
        
        {/* Contact Information */}
        <div className="w-full space-y-3 mb-6">
          {email && <ContactRow type="email" value={email} variant={variant} />}
          {location && <ContactRow type="location" value={location} variant={variant} />}
          {phone && <ContactRow type="phone" value={phone} variant={variant} />}
          {website && <ContactRow type="website" value={website} variant={variant} />}
        </div>
        
        {/* Social Links - Moved to the end */}
        {socials && socials.length > 0 && (
          <div className="w-full mb-6">
            <h3 className={cn(
              "text-sm font-medium mb-3 text-center",
              variant === 'minimal' ? "text-gray-700" : "text-white/70"
            )}>Réseaux sociaux</h3>
            <div className="grid grid-cols-2 gap-2">
              {socials.map((social, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center p-2 rounded-lg transition-all duration-300 transform hover:scale-105",
                    variant === 'minimal' 
                      ? "bg-gray-50 hover:bg-gray-100 text-gray-800" 
                      : "glass-morphism hover:border-white/30"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mr-2",
                    variant === 'minimal' 
                      ? "bg-gray-200" 
                      : "bg-white/10"
                  )}>
                    <SocialIcon network={social.network} url={social.url} size={16} className={variant === 'minimal' ? "text-gray-700" : "text-white"} />
                  </div>
                  <div>
                    <p className={cn(
                      "text-xs font-medium",
                      variant === 'minimal' ? "text-gray-500" : "text-white/70"
                    )}>{social.network}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* QR Code */}
        {showQrCode && qrUrl && (
          <div className={cn(
            "mt-6 p-3 rounded-lg",
            variant === 'minimal' 
              ? "bg-gray-50 border border-gray-100" 
              : "glass-morphism border border-white/20"
          )}>
            <div className="bg-white rounded-md p-2">
              <div className="w-32 h-32 bg-white grid place-items-center">
                <img src={qrUrl} alt="QR Code" className="w-full h-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface SocialButtonProps {
  network: SocialNetwork;
  url: string;
}

const SocialButton = ({ network, url }: SocialButtonProps) => {
  const getNetworkColor = (network: SocialNetwork) => {
    const networkColors: Record<SocialNetwork, string> = {
      facebook: "bg-blue-600",
      twitter: "bg-blue-400",
      linkedin: "bg-blue-700",
      instagram: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400",
      youtube: "bg-red-600",
      github: "bg-gray-800",
      dribbble: "bg-pink-500",
      behance: "bg-blue-800",
      tiktok: "bg-black",
      whatsapp: "bg-green-500",
      snapchat: "bg-yellow-400"
    };
    
    return networkColors[network] || "bg-gradient-to-br from-futuristic-purple to-futuristic-blue";
  };
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center",
        getNetworkColor(network)
      )}
    >
      <SocialIcon network={network} url={url} size={20} className="text-white" />
    </a>
  );
};

interface ContactRowProps {
  type: "email" | "phone" | "website" | "location";
  value: string;
  variant?: 'default' | 'preview' | 'minimal' | 'gradient' | 'dark' | 'elegant' | 'modern';
}

const ContactRow = ({ type, value, variant = 'default' }: ContactRowProps) => {
  const getContactInfo = (type: string) => {
    switch (type) {
      case "email":
        return {
          label: "Email",
          href: `mailto:${value}`,
          icon: <Mail className="w-4 h-4 text-white" />
        };
      case "phone":
        return {
          label: "Téléphone",
          href: `tel:${value}`,
          icon: <Phone className="w-4 h-4 text-white" />
        };
      case "location":
        return {
          label: "Location",
          href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`,
          icon: <MapPin className="w-4 h-4 text-white" />
        };
      case "website":
        return {
          label: "Site Web",
          href: value.startsWith("http") ? value : `https://${value}`,
          icon: <LinkIcon className="w-4 h-4 text-white" />
        };
      default:
        return {
          label: "Contact",
          href: "#",
          icon: <Mail className="w-4 h-4 text-white" />
        };
    }
  };
  
  const contactInfo = getContactInfo(type);
  
  return (
    <a
      href={contactInfo.href}
      target={type === "website" ? "_blank" : undefined}
      rel={type === "website" ? "noopener noreferrer" : undefined}
      className={cn(
        "flex items-center space-x-3 w-full p-3 rounded-lg hover:border-white/30 transition-all",
        variant === 'minimal' 
          ? "bg-gray-50 border border-gray-100 hover:border-gray-300" 
          : "glass-morphism border border-white/10"
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
        variant === 'minimal' 
          ? "bg-gray-800 text-white" 
          : "bg-gradient-futuristic from-futuristic-purple to-futuristic-blue"
      )}>
        {contactInfo.icon}
      </div>
      <div className="overflow-hidden">
        <p className={cn(
          "text-xs",
          variant === 'minimal' ? "text-gray-500" : "text-white/60"
        )}>{contactInfo.label}</p>
        <p className={cn(
          "text-sm truncate",
          variant === 'minimal' ? "text-gray-800" : "text-white"
        )}>{value}</p>
      </div>
    </a>
  );
};

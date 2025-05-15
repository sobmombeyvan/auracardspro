import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Twitter, Github, Youtube, Dribbble, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SocialNetwork = 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'github' | 'dribbble' | 'behance' | 'tiktok' | 'whatsapp' | 'snapchat';

interface SocialIconProps {
  network: SocialNetwork;
  url: string;
  size?: number;
  className?: string;
  showName?: boolean;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ 
  network, 
  url, 
  size = 24,
  className,
  showName = false
}) => {
  const getIcon = (network: SocialNetwork) => {
    switch (network) {
      case 'facebook':
        return <Facebook size={size} />;
      case 'twitter':
        return <Twitter size={size} />;
      case 'instagram':
        return <Instagram size={size} />;
      case 'linkedin':
        return <Linkedin size={size} />;
      case 'github':
        return <Github size={size} />;
      case 'youtube':
        return <Youtube size={size} />;
      case 'dribbble':
        return <Dribbble size={size} />;
      case 'whatsapp':
        return <MessageCircle size={size} />;
      case 'snapchat':
        // Custom Snapchat SVG
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
            <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z" fill="currentColor"/>
            <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="currentColor"/>
          </svg>
        );
      case 'tiktok':
        // Custom TikTok SVG
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.321 5.562a5.122 5.122 0 0 1-5.123-5.124h-3.083v16.77c0 1.264-1.027 2.292-2.29 2.292a2.292 2.292 0 0 1-2.292-2.292 2.292 2.292 0 0 1 2.291-2.291c.127 0 .253.01.374.03V11.82a5.407 5.407 0 0 0-.374-.013 5.419 5.419 0 0 0-5.419 5.421A5.418 5.418 0 0 0 8.825 22.65a5.418 5.418 0 0 0 5.419-5.42V10.03a8.294 8.294 0 0 0 5.077 1.712V8.659a5.151 5.151 0 0 1-3.083-.915v.002a5.122 5.122 0 0 1-2.04-4.078h5.123v1.894z" fill="currentColor"/>
          </svg>
        );
      case 'behance':
        // Use a custom SVG for Behance since it's not in lucide-react
        return (
          <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 13.5H10.5C11.3284 13.5 12 12.8284 12 12C12 11.1716 11.3284 10.5 10.5 10.5H7.5V13.5Z" fill="currentColor" />
            <path d="M7.5 7.5H10C10.8284 7.5 11.5 8.17157 11.5 9C11.5 9.82843 10.8284 10.5 10 10.5H7.5V7.5Z" fill="currentColor" />
            <path d="M14 7.5H18M16 9.5V7.5M14 11.5H18M14 16.5H16C17.1046 16.5 18 15.6046 18 14.5C18 13.3954 17.1046 12.5 16 12.5H14V16.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 12C22 16.714 22 19.071 20.5355 20.5355C19.071 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.071 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.071 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12Z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      default:
        return <Linkedin size={size} />;
    }
  };

  const getNetworkColor = (network: SocialNetwork) => {
    const colors: Record<SocialNetwork, string> = {
      facebook: 'hover:text-[#1877F2]',
      twitter: 'hover:text-[#1DA1F2]',
      instagram: 'hover:text-[#E4405F]',
      linkedin: 'hover:text-[#0A66C2]',
      youtube: 'hover:text-[#FF0000]',
      github: 'hover:text-[#181717]',
      dribbble: 'hover:text-[#EA4C89]',
      behance: 'hover:text-[#1769FF]',
      tiktok: 'hover:text-[#000000]',
      whatsapp: 'hover:text-[#25D366]',
      snapchat: 'hover:text-[#FFFC00]'
    };
    
    return colors[network];
  };

  const getNetworkName = (network: SocialNetwork) => {
    const names: Record<SocialNetwork, string> = {
      facebook: 'Facebook',
      twitter: 'Twitter',
      instagram: 'Instagram',
      linkedin: 'LinkedIn',
      youtube: 'YouTube',
      github: 'GitHub',
      dribbble: 'Dribbble',
      behance: 'Behance',
      tiktok: 'TikTok',
      whatsapp: 'WhatsApp',
      snapchat: 'Snapchat'
    };
    
    return names[network];
  };

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "transition-colors duration-200 text-white/80 flex flex-col items-center",
        getNetworkColor(network),
        className
      )}
    >
      <div className="mb-1">{getIcon(network)}</div>
      {showName && (
        <span className="text-xs mt-1 font-medium">{getNetworkName(network)}</span>
      )}
    </a>
  );
};

interface SocialIconsProps {
  profiles: {
    network: SocialNetwork;
    url: string;
  }[];
  size?: number;
  className?: string;
  layout?: 'grid' | 'inline';
  showNames?: boolean;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ 
  profiles,
  size = 24,
  className,
  layout = 'inline',
  showNames = false
}) => {
  return (
    <div className={cn(
      layout === 'inline' 
        ? "flex items-center space-x-4" 
        : "grid grid-cols-2 sm:grid-cols-3 gap-4",
      className
    )}>
      {profiles.map((profile, index) => (
        <SocialIcon 
          key={index}
          network={profile.network}
          url={profile.url}
          size={size}
          showName={showNames}
        />
      ))}
    </div>
  );
};


import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="glass-morphism border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-futuristic-purple to-futuristic-magenta shadow-lg" />
              <span className="text-xl font-bold text-gradient">AuraCards</span>
            </Link>
            <p className="text-white/70">
              La nouvelle génération de cartes de visite digitales avec un design futuriste.
            </p>
          </div>

          <FooterLinks 
            title="Produit" 
            links={[
              { label: "Fonctionnalités", href: "/features" },
              { label: "Tarifs", href: "/pricing" },
              { label: "Démo", href: "/demo" },
              { label: "FAQ", href: "/faq" },
            ]} 
          />

          <FooterLinks 
            title="Ressources" 
            links={[
              { label: "Blog", href: "/blog" },
              { label: "Support", href: "/support" },
              { label: "Documentation", href: "/docs" },
            ]} 
          />

          <FooterLinks 
            title="Légal" 
            links={[
              { label: "Conditions d'utilisation", href: "/terms" },
              { label: "Politique de confidentialité", href: "/privacy" },
              { label: "Cookies", href: "/cookies" },
            ]} 
          />
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} AuraCards. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <SocialLink href="#" label="Twitter" />
            <SocialLink href="#" label="LinkedIn" />
            <SocialLink href="#" label="Instagram" />
            <SocialLink href="#" label="Facebook" />
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinksProps {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

const FooterLinks = ({ title, links }: FooterLinksProps) => (
  <div>
    <h3 className="font-medium text-white mb-4">{title}</h3>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <Link to={link.href} className="text-white/70 hover:text-white transition-colors">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

interface SocialLinkProps {
  href: string;
  label: string;
}

const SocialLink = ({ href, label }: SocialLinkProps) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label={label}
    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
  >
    <div className="w-4 h-4 bg-white/70 rounded-sm" />
  </a>
);

export default Footer;

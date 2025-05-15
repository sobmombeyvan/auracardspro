
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6 text-center md:text-left animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient">
              Créez Votre Carte de Visite Digitale Futuriste
            </h1>
            <p className="text-lg text-white/80 max-w-xl">
              Partagez vos informations professionnelles avec style grâce à des cartes interactives
              personnalisables et faciles à partager via QR code.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
              <Link to="/register">
                <Button className="w-full sm:w-auto bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple text-white px-8 py-6 text-lg shadow-lg">
                  Commencer Gratuitement
                </Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Voir la Démo
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end">
            <CardPreviewAnimation />
          </div>
        </div>

        {/* Floating features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          <FeatureCard 
            title="QR Code Intégré" 
            description="Partagez facilement votre carte avec un code QR généré automatiquement"
            delay="0s"
          />
          <FeatureCard 
            title="Réseaux Sociaux" 
            description="Intégrez tous vos réseaux sociaux avec un design élégant"
            delay="0.2s"
          />
          <FeatureCard 
            title="Portfolio Intégré" 
            description="Présentez vos projets et réalisations dans votre carte"
            delay="0.4s"
          />
        </div>
      </div>
    </section>
  );
};

const CardPreviewAnimation = () => (
  <div className="relative w-80 h-[500px] perspective-1000">
    <div className="absolute inset-0 animate-float">
      <div className="relative w-full h-full glass-morphism rounded-2xl overflow-hidden p-6 border border-white/20 shadow-xl">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-futuristic-purple/30 blur-xl" />
        <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-futuristic-blue/30 blur-xl" />
        
        {/* Card Preview Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-futuristic-purple to-futuristic-magenta shadow-lg glow" />
          </div>
          
          <h3 className="text-xl font-bold text-center text-gradient">Jean Dupont</h3>
          <p className="text-center text-white/80 text-sm mb-6">Développeur Web</p>
          
          <div className="flex justify-center space-x-4 mb-6">
            <SocialIconPlaceholder />
            <SocialIconPlaceholder />
            <SocialIconPlaceholder />
            <SocialIconPlaceholder />
          </div>
          
          <div className="flex-1 glass-morphism rounded-lg p-4 mb-4">
            <div className="h-4 w-3/4 bg-white/20 rounded mb-2" />
            <div className="h-4 w-1/2 bg-white/20 rounded mb-2" />
            <div className="h-4 w-5/6 bg-white/20 rounded" />
          </div>
          
          <div className="flex justify-center">
            <div className="h-32 w-32 bg-white/20 rounded-lg grid place-items-center">
              <div className="h-24 w-24 border-2 border-dashed border-white/40 rounded grid place-items-center text-white/40">
                QR Code
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SocialIconPlaceholder = () => (
  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
    <div className="w-4 h-4 bg-white/60 rounded-sm" />
  </div>
);

interface FeatureCardProps {
  title: string;
  description: string;
  delay: string;
}

const FeatureCard = ({ title, description, delay }: FeatureCardProps) => (
  <div 
    className="glass-morphism rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 animate-slide-up"
    style={{ animationDelay: delay }}
  >
    <div className="w-12 h-12 mb-4 rounded-full bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta flex items-center justify-center">
      <div className="w-6 h-6 bg-white/80 rounded" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gradient">{title}</h3>
    <p className="text-white/70">{description}</p>
  </div>
);

export default HeroSection;

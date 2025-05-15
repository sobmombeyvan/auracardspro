
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Demo = () => {
  const [activeTemplate, setActiveTemplate] = useState('modern');

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Explorez nos modèles de cartes
            </h1>
            <p className="text-white/70 mx-auto max-w-2xl text-lg">
              Découvrez les différents modèles disponibles pour votre carte de visite digitale. 
              Choisissez celui qui correspond le mieux à votre style professionnel.
            </p>
          </div>

          <div className="flex flex-wrap mb-12 justify-center gap-4">
            <TemplateButton 
              name="modern" 
              label="Moderne" 
              active={activeTemplate === 'modern'} 
              onClick={() => setActiveTemplate('modern')} 
            />
            <TemplateButton 
              name="minimalist" 
              label="Minimaliste" 
              active={activeTemplate === 'minimalist'} 
              onClick={() => setActiveTemplate('minimalist')} 
            />
            <TemplateButton 
              name="vibrant" 
              label="Vibrant" 
              active={activeTemplate === 'vibrant'} 
              onClick={() => setActiveTemplate('vibrant')} 
            />
            <TemplateButton 
              name="professional" 
              label="Professionnel" 
              active={activeTemplate === 'professional'} 
              onClick={() => setActiveTemplate('professional')} 
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative w-80 h-[500px] perspective-1000">
                <div className="w-full h-full animate-float">
                  <TemplatePreview template={activeTemplate} />
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 glass-morphism p-8 rounded-xl border border-white/20">
              <h2 className="text-2xl font-bold text-gradient mb-4">
                {getTemplateInfo(activeTemplate).title}
              </h2>
              <p className="text-white/80 mb-6">
                {getTemplateInfo(activeTemplate).description}
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-4">Caractéristiques:</h3>
              <ul className="space-y-3 mb-8">
                {getTemplateInfo(activeTemplate).features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-3 text-futuristic-purple">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="flex-1">
                  <Button className="w-full bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple">
                    Essayer ce modèle
                  </Button>
                </Link>
                <Link to="/pricing" className="flex-1">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Voir les tarifs
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-3xl font-bold text-gradient mb-6">
              Prêt à créer votre carte digitale?
            </h2>
            <p className="text-white/70 mx-auto max-w-2xl mb-8">
              Inscrivez-vous gratuitement et commencez à créer votre carte de visite digitale professionnelle dès aujourd'hui.
            </p>
            <Link to="/register">
              <Button className="bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple text-white px-8 py-6 text-lg">
                Commencer Gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface TemplateButtonProps {
  name: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const TemplateButton = ({ name, label, active, onClick }: TemplateButtonProps) => (
  <button
    className={cn(
      "px-6 py-3 rounded-lg font-medium transition-all duration-300",
      active 
        ? "bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta text-white" 
        : "glass-morphism border border-white/20 text-white hover:border-white/40"
    )}
    onClick={onClick}
  >
    {label}
  </button>
);

interface TemplatePreview {
  template: string;
}

const TemplatePreview = ({ template }: TemplatePreview) => {
  const getTemplateClass = () => {
    switch (template) {
      case 'minimalist':
        return "glass-morphism bg-opacity-50 border border-white/10";
      case 'vibrant':
        return "glass-morphism bg-gradient-to-br from-futuristic-purple/20 to-futuristic-blue/20 border border-futuristic-purple/30";
      case 'professional':
        return "glass-morphism bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/20";
      case 'modern':
      default:
        return "glass-morphism border border-white/20";
    }
  };

  return (
    <div className={cn("w-full h-full rounded-2xl overflow-hidden p-6 shadow-xl", getTemplateClass())}>
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-futuristic-purple/30 blur-xl" />
      <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-futuristic-blue/30 blur-xl" />
      
      {/* Card Preview Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-center mb-5">
          <div className={cn("w-20 h-20 rounded-full shadow-lg", 
            template === 'minimalist' ? "bg-white/90" : 
            template === 'vibrant' ? "bg-gradient-to-br from-futuristic-orange to-futuristic-magenta glow" : 
            template === 'professional' ? "bg-gradient-to-br from-slate-200 to-slate-400" : 
            "bg-gradient-to-br from-futuristic-purple to-futuristic-magenta glow")}
          />
        </div>
        
        <h3 className={cn("text-xl font-bold text-center mb-1", 
          template === 'minimalist' ? "text-white" : 
          template === 'vibrant' ? "text-gradient-purple" : 
          template === 'professional' ? "text-white" : 
          "text-gradient")}>Jean Dupont</h3>
        <p className={cn("text-center text-sm mb-6", 
          template === 'minimalist' ? "text-white/90" : 
          template === 'vibrant' ? "text-white font-medium" : 
          template === 'professional' ? "text-white/80" : 
          "text-white/80")}>Développeur Web</p>
        
        <div className={cn("flex justify-center space-x-4 mb-6", 
          template === 'vibrant' ? "scale-110" : "")}>
          <SocialIconPlaceholder template={template} />
          <SocialIconPlaceholder template={template} />
          <SocialIconPlaceholder template={template} />
          <SocialIconPlaceholder template={template} />
        </div>
        
        <div className={cn("flex-1 rounded-lg p-4 mb-4", 
          template === 'minimalist' ? "bg-white/5" : 
          template === 'vibrant' ? "bg-gradient-to-br from-white/10 to-futuristic-purple/10 border border-white/10" : 
          template === 'professional' ? "bg-slate-700/30 border border-slate-600/30" : 
          "glass-morphism")}>
          <div className={cn("h-4 w-3/4 rounded mb-2", 
            template === 'minimalist' ? "bg-white/10" : 
            template === 'vibrant' ? "bg-white/20" : 
            template === 'professional' ? "bg-slate-500/40" : 
            "bg-white/20")} />
          <div className={cn("h-4 w-1/2 rounded mb-2", 
            template === 'minimalist' ? "bg-white/10" : 
            template === 'vibrant' ? "bg-white/20" : 
            template === 'professional' ? "bg-slate-500/40" : 
            "bg-white/20")} />
          <div className={cn("h-4 w-5/6 rounded", 
            template === 'minimalist' ? "bg-white/10" : 
            template === 'vibrant' ? "bg-white/20" : 
            template === 'professional' ? "bg-slate-500/40" : 
            "bg-white/20")} />
        </div>
        
        <div className="flex justify-center">
          <div className={cn("h-28 w-28 grid place-items-center", 
            template === 'minimalist' ? "bg-white/10 rounded-lg" : 
            template === 'vibrant' ? "bg-gradient-to-br from-white/20 to-futuristic-purple/10 rounded-xl" : 
            template === 'professional' ? "bg-slate-700/50 rounded-lg border border-slate-600/30" : 
            "bg-white/20 rounded-lg")}>
            <div className={cn("h-20 w-20 grid place-items-center text-white/40", 
              template === 'minimalist' ? "border border-white/20" : 
              template === 'vibrant' ? "border-2 border-dashed border-futuristic-purple/40" : 
              template === 'professional' ? "border border-slate-400/30" : 
              "border-2 border-dashed border-white/40")}>
              QR Code
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialIconPlaceholder = ({ template }: { template: string }) => (
  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", 
    template === 'minimalist' ? "bg-white/10" : 
    template === 'vibrant' ? "bg-gradient-to-br from-white/20 to-futuristic-purple/20 border border-white/10" : 
    template === 'professional' ? "bg-slate-600/50 border border-slate-500/30" : 
    "bg-white/20")}>
    <div className={cn("w-4 h-4 rounded-sm", 
      template === 'minimalist' ? "bg-white/50" : 
      template === 'vibrant' ? "bg-white/70" : 
      template === 'professional' ? "bg-slate-300/70" : 
      "bg-white/60")} />
  </div>
);

interface TemplateInfo {
  title: string;
  description: string;
  features: string[];
}

const getTemplateInfo = (template: string): TemplateInfo => {
  switch (template) {
    case 'minimalist':
      return {
        title: "Modèle Minimaliste",
        description: "Un design épuré et élégant qui met l'accent sur l'essentiel. Parfait pour les créatifs et les professionnels qui préfèrent la simplicité.",
        features: [
          "Design épuré et minimaliste",
          "Typographie élégante",
          "Transitions douces",
          "Optimisé pour une lecture facile",
          "Accent sur le contenu"
        ]
      };
    case 'vibrant':
      return {
        title: "Modèle Vibrant",
        description: "Un design coloré et dynamique qui attire l'attention. Idéal pour les professionnels du marketing, les artistes et les créateurs de contenu.",
        features: [
          "Palette de couleurs vives",
          "Animations attrayantes",
          "Mise en page dynamique",
          "Accent sur les visuels",
          "Parfait pour se démarquer"
        ]
      };
    case 'professional':
      return {
        title: "Modèle Professionnel",
        description: "Un design sophistiqué et raffiné pour les cadres, consultants et professionnels de secteurs traditionnels.",
        features: [
          "Apparence formelle et sérieuse",
          "Palette de couleurs neutres",
          "Design orienté business",
          "Mise en page structurée",
          "QR code de contact rapide"
        ]
      };
    case 'modern':
    default:
      return {
        title: "Modèle Moderne",
        description: "Notre design le plus populaire, avec un style futuriste et contemporain. Parfait pour les professionnels de la technologie et du numérique.",
        features: [
          "Effet verre dépoli (glassmorphism)",
          "Dégradés subtils et élégants",
          "Animations douces",
          "Affichage complet des réseaux sociaux",
          "QR code intégré pour un partage facile"
        ]
      };
  }
};

export default Demo;

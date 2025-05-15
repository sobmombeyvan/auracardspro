
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { BusinessCard } from '@/components/ui/business-card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        
        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                Une Carte de Visite pour le Futur
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Découvrez comment nos cartes de visite digitales révolutionnent le networking professionnel 
                avec un design futuriste et des fonctionnalités avancées.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                title="QR Code Intelligent" 
                description="Partagez votre carte instantanément via un code QR dynamique qui peut être scanné par n'importe quel smartphone."
                iconClass="bg-futuristic-purple"
              />
              <FeatureCard 
                title="Réseaux Sociaux Intégrés" 
                description="Connectez tous vos profils sociaux en un seul endroit avec un design élégant et cohérent."
                iconClass="bg-futuristic-blue"
              />
              <FeatureCard 
                title="Portfolio Interactif" 
                description="Présentez vos projets et réalisations avec une galerie visuelle interactive directement dans votre carte."
                iconClass="bg-futuristic-magenta"
              />
              <FeatureCard 
                title="Ajout aux Contacts" 
                description="Permettez aux personnes d'ajouter vos informations à leurs contacts d'un simple clic."
                iconClass="bg-futuristic-orange"
              />
              <FeatureCard 
                title="Analytics Détaillés" 
                description="Suivez qui consulte votre carte et quelles informations intéressent le plus vos contacts."
                iconClass="bg-futuristic-vivid-purple"
              />
              <FeatureCard 
                title="Design Personnalisable" 
                description="Choisissez parmi plusieurs thèmes futuristes et personnalisez chaque aspect de votre carte."
                iconClass="bg-futuristic-bright-blue"
              />
            </div>
          </div>
        </section>
        
        {/* Card Preview Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                  Un Design Futuriste pour Vous Démarquer
                </h2>
                <p className="text-white/70">
                  Notre design inspiré du futur combine élégance et technologie pour créer une 
                  expérience mémorable. Avec des effets de verre, des dégradés subtils et des 
                  animations fluides, votre carte de visite ne passera pas inaperçue.
                </p>
                <ul className="space-y-3">
                  {[
                    "Interface épurée et moderne",
                    "Effets visuels avancés",
                    "Animations réactives et fluides",
                    "Thèmes personnalisables",
                    "Compatible avec tous les appareils"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-futuristic-purple to-futuristic-magenta mt-1 mr-3 shrink-0" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <div className="relative w-72 h-[500px]">
                  <div className="absolute inset-0 animate-float">
                    <BusinessCard 
                      name="Jean Dupont"
                      title="Développeur Web"
                      email="jean.dupont@example.com"
                      phone="+33 6 12 34 56 78"
                      website="jeandupont.com"
                      socials={[
                        { network: "linkedin", url: "#" },
                        { network: "twitter", url: "#" },
                        { network: "github", url: "#" },
                        { network: "dribbble", url: "#" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center glass-morphism rounded-2xl p-12 border border-white/20">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
                Prêt à Créer Votre Carte de Visite Digitale?
              </h2>
              <p className="text-white/70 mb-8">
                Rejoignez des milliers de professionnels qui ont déjà adopté la carte de visite du futur. 
                Commencez gratuitement et voyez la différence par vous-même.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple text-white px-8 py-3 rounded-lg font-medium shadow-lg">
                  Créer Ma Carte Gratuitement
                </button>
                <button className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors">
                  En Savoir Plus
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  iconClass?: string;
}

const FeatureCard = ({ title, description, iconClass }: FeatureCardProps) => (
  <div className="glass-morphism rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 group">
    <div className={`w-12 h-12 mb-4 rounded-full ${iconClass || 'bg-futuristic-purple'} flex items-center justify-center`}>
      <div className="w-6 h-6 bg-white/80 rounded" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gradient group-hover:text-glow transition-all">{title}</h3>
    <p className="text-white/70">{description}</p>
  </div>
);

export default Index;


import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
                Nos Tarifs
              </h1>
              <p className="text-white/70 max-w-3xl mx-auto text-lg">
                Choisissez le plan qui correspond à vos besoins. Tous nos plans incluent des mises à jour gratuites.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 justify-center max-w-6xl mx-auto">
              <PricingCard
                name="Basic"
                price="Gratuit"
                description="Pour les utilisateurs individuels"
                features={[
                  "1 carte digitale",
                  "QR code standard",
                  "3 designs de base",
                  "Statistiques basiques",
                  "100 vues par mois"
                ]}
                cta="Commencer gratuitement"
                ctaLink="/register"
                variant="basic"
              />

              <PricingCard
                name="Pro"
                price="9,99€"
                period="par mois"
                description="Pour les professionnels"
                features={[
                  "5 cartes digitales",
                  "QR code personnalisé",
                  "Tous les designs",
                  "Statistiques avancées",
                  "Vues illimitées",
                  "Suppression du logo AuraCards",
                  "Support prioritaire par email"
                ]}
                cta="Essai gratuit de 7 jours"
                ctaLink="/register"
                variant="pro"
                popular={true}
              />

              <PricingCard
                name="Business"
                price="24,99€"
                period="par mois"
                description="Pour les équipes et entreprises"
                features={[
                  "Cartes illimitées",
                  "QR codes de marque",
                  "Designs sur mesure",
                  "Analytics d'équipe",
                  "Intégration CRM",
                  "API complète",
                  "Domaine personnalisé",
                  "Support téléphonique dédié"
                ]}
                cta="Contacter les ventes"
                ctaLink="/contact"
                variant="business"
              />
            </div>

            <div className="mt-24 text-center">
              <h2 className="text-3xl font-bold text-gradient mb-8">
                Questions fréquentes sur les tarifs
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
                <div className="glass-morphism rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Puis-je changer de plan à tout moment ?
                  </h3>
                  <p className="text-white/70">
                    Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. 
                    Le changement prendra effet à la prochaine période de facturation.
                  </p>
                </div>
                
                <div className="glass-morphism rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Y a-t-il des frais cachés ?
                  </h3>
                  <p className="text-white/70">
                    Non, tous nos prix sont transparents. Il n'y a aucun frais caché et vous 
                    ne payez que pour le plan que vous avez choisi.
                  </p>
                </div>
                
                <div className="glass-morphism rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Comment fonctionne l'essai gratuit ?
                  </h3>
                  <p className="text-white/70">
                    L'essai gratuit de 7 jours vous donne accès à toutes les fonctionnalités du plan Pro. 
                    Aucune carte de crédit n'est requise pour commencer.
                  </p>
                </div>
                
                <div className="glass-morphism rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    Proposez-vous des remises pour les organisations à but non lucratif ?
                  </h3>
                  <p className="text-white/70">
                    Oui, nous offrons une remise de 50% sur tous nos plans pour les organisations 
                    à but non lucratif et les établissements d'enseignement. Contactez notre équipe 
                    commerciale pour plus d'informations.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-24 text-center glass-morphism rounded-2xl p-12 border border-white/20 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gradient mb-4">
                Besoin d'un plan personnalisé ?
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Nous proposons des solutions sur mesure pour les grandes entreprises et les besoins spécifiques. 
                Notre équipe est prête à créer une offre adaptée à vos exigences.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact" className="bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple text-white px-8 py-3 rounded-lg font-medium shadow-lg">
                  Contacter notre équipe
                </Link>
                <Link to="/features" className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-medium transition-colors">
                  Voir toutes les fonctionnalités
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  variant: 'basic' | 'pro' | 'business';
  popular?: boolean;
}

const PricingCard = ({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  cta, 
  ctaLink, 
  variant, 
  popular = false 
}: PricingCardProps) => {
  const getGradient = () => {
    switch (variant) {
      case 'pro':
        return 'from-futuristic-purple to-futuristic-magenta';
      case 'business':
        return 'from-futuristic-bright-blue to-futuristic-vivid-purple';
      default:
        return 'from-futuristic-blue to-futuristic-blue/50';
    }
  };

  return (
    <div className={`glass-morphism rounded-xl border transition-all duration-300 flex-1 ${
      popular 
        ? 'border-futuristic-magenta shadow-glow lg:scale-105 z-10' 
        : 'border-white/20 hover:border-white/30'
    }`}>
      {popular && (
        <div className="bg-gradient-to-r from-futuristic-purple to-futuristic-magenta text-white text-center py-1 rounded-t-xl font-medium">
          Recommandé
        </div>
      )}
      
      <div className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gradient">{name}</h3>
          <div className="mt-4 mb-2">
            <span className="text-3xl font-bold">{price}</span>
            {period && <span className="text-white/70 ml-1">{period}</span>}
          </div>
          <p className="text-white/70">{description}</p>
        </div>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={`mr-3 rounded-full p-1 bg-gradient-to-br ${getGradient()}`}>
                <Check size={14} className="text-white" />
              </span>
              <span className="text-white/80">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link to={ctaLink} className={`block w-full py-3 text-center rounded-lg font-medium ${
          variant === 'basic'
            ? 'border border-white/20 text-white hover:bg-white/10 transition-colors'
            : `bg-gradient-to-r ${getGradient()} text-white hover:brightness-110 transition-all`
        }`}>
          {cta}
        </Link>
      </div>
    </div>
  );
};

export default Pricing;

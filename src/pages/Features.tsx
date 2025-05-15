
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';

const Features = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 pt-24">
        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
                Fonctionnalités
              </h1>
              <p className="text-white/70 max-w-3xl mx-auto text-lg">
                Découvrez les fonctionnalités avancées qui font d'AuraCards la solution ultime pour vos cartes de visite digitales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <FeatureSection
                title="Créez votre identité numérique"
                features={[
                  "Multiples designs futuristes",
                  "Personnalisation complète des couleurs et effets",
                  "Intégration de votre photo professionnelle",
                  "Bio et présentation personnalisée"
                ]}
              />

              <FeatureSection
                title="Partagez instantanément"
                features={[
                  "QR Code dynamique pour partage rapide",
                  "Lien court facile à mémoriser",
                  "Intégration directe dans vos emails",
                  "Partage sur réseaux sociaux en un clic"
                ]}
              />

              <FeatureSection
                title="Gérez vos contacts professionnels"
                features={[
                  "Suivi des vues et interactions",
                  "Statistiques détaillées par contact",
                  "Notifications de consultation",
                  "Exportation des données de contacts"
                ]}
              />

              <FeatureSection
                title="Étendez votre présence"
                features={[
                  "Intégration de tous vos réseaux sociaux",
                  "Affichage de votre portfolio de projets",
                  "Boutons d'action personnalisables",
                  "Mise à jour en temps réel de vos informations"
                ]}
              />
            </div>

            <div className="mt-24 glass-morphism rounded-2xl p-12 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gradient">Comparaison des Plans</h2>
                <p className="text-white/70 mt-3">
                  Choisissez la formule qui correspond à vos besoins professionnels
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PlanCard
                  name="Basic"
                  price="Gratuit"
                  description="Idéal pour débuter"
                  features={[
                    "1 carte digitale",
                    "Designs de base",
                    "QR code standard",
                    "Statistiques basiques"
                  ]}
                  buttonText="Commencer gratuitement"
                  buttonVariant="outline"
                />
                
                <PlanCard
                  name="Pro"
                  price="9,99€/mois"
                  description="Pour les professionnels"
                  features={[
                    "5 cartes digitales",
                    "Tous les designs premium",
                    "QR code personnalisé",
                    "Statistiques avancées",
                    "Suppression des marques"
                  ]}
                  buttonText="Essai gratuit de 7 jours"
                  buttonVariant="primary"
                  highlighted={true}
                />
                
                <PlanCard
                  name="Business"
                  price="24,99€/mois"
                  description="Pour les équipes"
                  features={[
                    "Cartes illimitées",
                    "Designs sur mesure",
                    "Intégration CRM",
                    "Analytics d'équipe",
                    "Support prioritaire",
                    "API complète"
                  ]}
                  buttonText="Contacter les ventes"
                  buttonVariant="outline"
                />
              </div>
            </div>
            
            <div className="mt-24 text-center">
              <h2 className="text-3xl font-bold text-gradient mb-8">Questions fréquentes</h2>
              <div className="glass-morphism rounded-2xl p-8 border border-white/20 max-w-3xl mx-auto">
                <div className="space-y-6">
                  <FaqItem 
                    question="Comment fonctionne le partage par QR code ?"
                    answer="Notre technologie génère automatiquement un QR code unique pour votre carte. Lorsqu'une personne le scanne avec son smartphone, elle accède instantanément à votre carte digitale complète, sans avoir besoin d'installer d'application."
                  />
                  <FaqItem 
                    question="Puis-je modifier ma carte après l'avoir créée ?"
                    answer="Absolument ! Vous pouvez mettre à jour et modifier votre carte à tout moment depuis votre tableau de bord. Les modifications sont appliquées instantanément et toutes les personnes qui accèdent à votre carte verront toujours la dernière version."
                  />
                  <FaqItem 
                    question="Comment fonctionnent les statistiques ?"
                    answer="Nous suivons anonymement les visites sur votre carte. Vous pouvez voir combien de personnes ont consulté votre profil, quand, et quelles informations les ont le plus intéressées, le tout dans un dashboard intuitif."
                  />
                  <FaqItem 
                    question="Puis-je avoir plusieurs designs de cartes ?"
                    answer="Oui ! Selon votre formule, vous pouvez créer plusieurs cartes avec différents designs. C'est idéal pour adapter votre présentation à différents contextes professionnels ou pour gérer plusieurs activités."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface FeatureSectionProps {
  title: string;
  features: string[];
}

const FeatureSection = ({ title, features }: FeatureSectionProps) => (
  <div className="glass-morphism rounded-xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
    <h3 className="text-2xl font-bold text-gradient mb-6">{title}</h3>
    <ul className="space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-futuristic-purple to-futuristic-magenta mt-1 mr-3 shrink-0" />
          <span className="text-white/80">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface PlanCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: 'outline' | 'primary';
  highlighted?: boolean;
}

const PlanCard = ({ name, price, description, features, buttonText, buttonVariant, highlighted = false }: PlanCardProps) => (
  <div className={`glass-morphism rounded-xl p-8 border transition-all duration-300 ${
    highlighted 
      ? 'border-futuristic-magenta shadow-glow' 
      : 'border-white/20 hover:border-white/30'
  }`}>
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-gradient">{name}</h3>
      <div className="text-2xl font-bold my-3">{price}</div>
      <p className="text-white/70">{description}</p>
    </div>
    
    <ul className="space-y-3 mb-8">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-futuristic-purple to-futuristic-magenta mt-1 mr-3 shrink-0" />
          <span className="text-white/80">{feature}</span>
        </li>
      ))}
    </ul>
    
    <button className={`w-full py-2 rounded-lg font-medium ${
      buttonVariant === 'primary'
        ? 'bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple text-white'
        : 'border border-white/20 text-white hover:bg-white/10'
    }`}>
      {buttonText}
    </button>
  </div>
);

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => (
  <div className="border-b border-white/10 pb-4">
    <h4 className="text-xl font-semibold mb-2 text-white">{question}</h4>
    <p className="text-white/70">{answer}</p>
  </div>
);

export default Features;

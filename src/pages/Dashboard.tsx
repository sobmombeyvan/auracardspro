import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { BusinessCard } from '@/components/ui/business-card';
import { PlusCircle, Edit, Trash, Eye, Share } from 'lucide-react';

const Dashboard = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate('/login');
        return;
      }
      
      setUser(data.session.user);
      fetchCards(data.session.user.id);
    };
    
    checkAuth();
  }, [navigate]);

  const fetchCards = async (userId: string) => {
    try {
      console.log("Fetching cards for user ID:", userId);
      
      const { data, error } = await supabase
        .from('business_cards')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Supabase fetch error:", error);
        throw error;
      }
      
      console.log("Cards fetched:", data);
      setCards(data || []);
    } catch (error: any) {
      console.error('Error fetching cards:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger vos cartes. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
      });
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) return;
    
    try {
      const { error } = await supabase
        .from('business_cards')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setCards(cards.filter(card => card.id !== id));
      
      toast({
        title: "Carte supprimée",
        description: "Votre carte a été supprimée avec succès",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer la carte. Veuillez réessayer.",
      });
    }
  };

  const handleShareCard = async (cardId: string) => {
    try {
      const { data: card, error } = await supabase
        .from('business_cards')
        .select('slug')
        .eq('id', cardId)
        .single();

      if (error) throw error;
      if (!card) throw new Error('Carte non trouvée');

      const shareUrl = `${window.location.origin}/c/${card.slug}`;
      await navigator.clipboard.writeText(shareUrl);
      
      toast({
        title: "Lien copié !",
        description: "Le lien de partage a été copié dans le presse-papiers.",
      });
    } catch (error) {
      console.error('Error sharing card:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de partager la carte. Veuillez réessayer.",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Tableau de bord</h1>
            <p className="text-white/70 mt-2">
              Gérez vos cartes digitales et consultez vos statistiques
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-3">
            {user?.email === 'sobmombeyvan@gmail.com' && (
              <Link to="/admin">
                <Button 
                  variant="outline" 
                  className="border-purple-500/20 text-purple-400 hover:bg-purple-500/10"
                >
                  Admin Dashboard
                </Button>
              </Link>
            )}
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Se déconnecter
            </Button>
            <Link to="/create">
              <Button className="bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple flex items-center space-x-2">
                <PlusCircle size={16} />
                <span>Créer une carte</span>
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="glass-morphism rounded-xl border border-white/20 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Mes cartes digitales</h2>
          
          {loading ? (
            <div className="py-8 text-center text-white/70">
              Chargement de vos cartes...
            </div>
          ) : cards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map(card => (
                <div key={card.id} className="glass-morphism rounded-lg border border-white/20 overflow-hidden">
                  <div className="p-4 h-[400px] flex items-center justify-center relative">
                    <div className="w-64 h-96 transform scale-75">
                      <BusinessCard
                        name={card.name}
                        title={card.title}
                        email={card.email}
                        phone={card.phone}
                        website={card.website}
                        photo={card.photo_url}
                        logo={card.logo_url}
                        socials={[]}
                        variant={card.template || 'default'}
                      />
                    </div>
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        card.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {card.published ? 'Publié' : 'Brouillon'}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-white/10 p-4">
                    <h3 className="font-semibold text-lg mb-1 text-gradient">{card.name}</h3>
                    <p className="text-white/70 text-sm mb-3">{card.title}</p>
                    
                    <div className="flex space-x-2 justify-between">
                      <Link to={`/c/${card.slug}`}>
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                          <Eye size={16} className="mr-1" /> Voir
                        </Button>
                      </Link>
                      <Link to={`/edit/${card.id}`}>
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                          <Edit size={16} className="mr-1" /> Modifier
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => handleShareCard(card.id)}
                      >
                        <Share size={16} className="mr-1" /> Partager
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-white/20 text-white hover:bg-red-400/20 hover:text-red-400 hover:border-red-400/30"
                        onClick={() => handleDeleteCard(card.id)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-white/70 mb-4">Vous n'avez pas encore créé de carte digitale</p>
              <Link to="/create">
                <Button className="bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple">
                  Créer ma première carte
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Edit, Trash, Eye, Share, Users, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Card {
  id: string;
  user_id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  published: boolean;
  created_at: string;
}

const ADMIN_EMAIL = 'sobmombeyvan@gmail.com';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'cards'>('users');

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      
      console.log('Current user:', user);
      
      if (!user) {
        console.log('No user found');
        setAccessDenied(true);
        setLoading(false);
        return;
      }

      // Vérification simple basée sur l'email
      if (user.email !== ADMIN_EMAIL) {
        console.log('User is not admin:', user.email);
        setAccessDenied(true);
        setLoading(false);
        return;
      }

      console.log('User is admin, fetching cards...');
      await fetchCards();
    };
    checkAdminAndFetch();
  }, []);

  const fetchCards = async () => {
    try {
      const { data: cardsData, error } = await supabase
        .from('business_cards')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCards(cardsData || []);
    } catch (error: any) {
      console.error('Error fetching cards:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les données",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette carte ?")) return;
    
    try {
      console.log('Starting deletion process for card:', id);
      console.log('Current user:', (await supabase.auth.getSession()).data.session?.user);
      
      // Delete social links first
      const { error: socialsError } = await supabase
        .from('social_links')
        .delete()
        .eq('card_id', id);
      
      if (socialsError) {
        console.error('Error deleting social links:', socialsError);
        throw socialsError;
      }
      console.log('Social links deleted successfully');
      
      // Delete portfolio items
      const { error: portfolioError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('card_id', id);
      
      if (portfolioError) {
        console.error('Error deleting portfolio items:', portfolioError);
        throw portfolioError;
      }
      console.log('Portfolio items deleted successfully');
      
      // Finally delete the card
      const { error: cardError } = await supabase
        .from('business_cards')
        .delete()
        .eq('id', id);
      
      if (cardError) {
        console.error('Error deleting card:', cardError);
        throw cardError;
      }
      console.log('Card deleted successfully');
      
      setCards(cards.filter(card => card.id !== id));
      toast({
        title: "Carte supprimée",
        description: "La carte a été supprimée avec succès"
      });
    } catch (error: any) {
      console.error('Full error details:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible de supprimer la carte. Vérifiez la console pour plus de détails."
      });
    }
  };

  const handleShareCard = async (id: string) => {
    const url = `${window.location.origin}/card/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Lien copié",
        description: "Le lien de la carte a été copié dans le presse-papier",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de copier le lien",
      });
    }
  };

  // Derive unique users from cards
  const users = Array.from(
    cards.reduce((map, card) => {
      if (!map.has(card.user_id)) {
        map.set(card.user_id, { 
          id: card.user_id, 
          email: card.email,
          cards: cards.filter(c => c.user_id === card.user_id)
        });
      }
      return map;
    }, new Map<string, { id: string; email: string; cards: Card[] }>()).values()
  );

  // Filter cards based on search term
  const filteredCards = cards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white text-xl">Chargement...</div>;
  }
  if (accessDenied) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl font-bold">Accès refusé</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
            <p className="text-white/70 mt-2">
              Gérez les utilisateurs et les cartes digitales
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              variant={activeTab === 'users' ? "default" : "outline"}
              className={activeTab === 'users' ? "bg-purple-600" : "border-white/20 text-white"}
              onClick={() => setActiveTab('users')}
            >
              <Users size={16} className="mr-2" />
              Utilisateurs
            </Button>
            <Button 
              variant={activeTab === 'cards' ? "default" : "outline"}
              className={activeTab === 'cards' ? "bg-purple-600" : "border-white/20 text-white"}
              onClick={() => setActiveTab('cards')}
            >
              <CreditCard size={16} className="mr-2" />
              Cartes
            </Button>
          </div>
        </div>

        {activeTab === 'users' ? (
          <div className="glass-morphism rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Utilisateurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map(user => (
                <div key={user.id} className="glass-morphism rounded-lg border border-white/20 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white">{user.email}</h3>
                      <p className="text-white/70 text-sm">{user.cards.length} cartes</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {user.cards.map(card => (
                      <div key={card.id} className="flex items-center justify-between p-2 bg-white/5 rounded">
                        <span className="text-white/90">{card.name}</span>
                        <Link to={`/edit/${card.id}`}>
                          <Button size="sm" variant="outline" className="border-white/20 text-white">
                            <Edit size={14} />
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-morphism rounded-xl border border-white/20 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Cartes</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                <Input
                  type="text"
                  placeholder="Rechercher une carte..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50 w-64"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="bg-white/10">
                    <th className="p-3 text-left">Nom</th>
                    <th className="p-3 text-left">Titre</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left">Téléphone</th>
                    <th className="p-3 text-left">Site Web</th>
                    <th className="p-3 text-left">Statut</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCards.map(card => (
                    <tr key={card.id} className="border-b border-white/10">
                      <td className="p-3">{card.name}</td>
                      <td className="p-3">{card.title}</td>
                      <td className="p-3">{card.email}</td>
                      <td className="p-3">{card.phone}</td>
                      <td className="p-3">{card.website}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          card.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {card.published ? 'Publié' : 'Brouillon'}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <Link to={`/card/${card.id}`}>
                            <Button size="sm" variant="outline" className="border-white/20 text-white">
                              <Eye size={14} />
                            </Button>
                          </Link>
                          <Link to={`/edit/${card.id}`}>
                            <Button size="sm" variant="outline" className="border-white/20 text-white">
                              <Edit size={14} />
                            </Button>
                          </Link>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-white/20 text-white"
                            onClick={() => handleShareCard(card.id)}
                          >
                            <Share size={14} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                            onClick={() => handleDeleteCard(card.id)}
                          >
                            <Trash size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard; 
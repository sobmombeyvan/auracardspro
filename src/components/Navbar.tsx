import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-futuristic-purple to-futuristic-magenta shadow-lg glow" />
            <span className="text-xl font-bold text-gradient">AuraCards</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            <div className="flex items-center space-x-3">
              {user ? (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      Tableau de bord
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={handleSignOut}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      Connexion
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple text-white">
                      Inscription
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={cn(
        "md:hidden glass-morphism absolute w-full py-4",
        isMenuOpen ? "animate-slide-down" : "hidden"
      )}>
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <MobileNavLinks closeMenu={() => setIsMenuOpen(false)} />
          <div className="flex flex-col space-y-3 pt-3 border-t border-white/10">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-white hover:bg-white/10">
                    Tableau de bord
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full border-white/20 text-white hover:bg-white/10"
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full text-white hover:bg-white/10">
                    Connexion
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple text-white">
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLinks = () => (
  <div className="flex items-center space-x-6">
    <Link to="/" className="text-white/80 hover:text-white transition-colors">
      Accueil
    </Link>
    <Link to="/features" className="text-white/80 hover:text-white transition-colors">
      Fonctionnalités
    </Link>
    <Link to="/pricing" className="text-white/80 hover:text-white transition-colors">
      Tarifs
    </Link>
  </div>
);

const MobileNavLinks = ({ closeMenu }: { closeMenu: () => void }) => (
  <div className="flex flex-col space-y-4">
    <Link 
      to="/" 
      className="text-white/80 hover:text-white transition-colors"
      onClick={closeMenu}
    >
      Accueil
    </Link>
    <Link 
      to="/features" 
      className="text-white/80 hover:text-white transition-colors"
      onClick={closeMenu}
    >
      Fonctionnalités
    </Link>
    <Link 
      to="/pricing" 
      className="text-white/80 hover:text-white transition-colors"
      onClick={closeMenu}
    >
      Tarifs
    </Link>
  </div>
);

export default Navbar;

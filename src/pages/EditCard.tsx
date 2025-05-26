import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { BusinessCard } from '@/components/ui/business-card';
import { SocialNetwork } from '@/components/SocialIcons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BusinessCard {
  id: string;
  user_id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  photo_url: string;
  logo_url: string;
  template: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  slug: string;
}

interface SocialLink {
  id?: string;
  network: SocialNetwork;
  url: string;
}

interface PortfolioItem {
  id?: string;
  title: string;
  description?: string;
  link?: string;
  image_url?: string;
}

const EditCard = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'socials' | 'portfolio' | 'design'>('info');
  const [previewVisible, setPreviewVisible] = useState(false);
  
  // Card basic info
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');
  const [logo, setLogo] = useState('');
  
  // Contact information
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  
  // Social links
  const [socials, setSocials] = useState<SocialLink[]>([]);
  
  // Portfolio items
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  
  // Published status
  const [published, setPublished] = useState(true);
  
  // Template
  const [variant, setVariant] = useState<'default' | 'minimal' | 'gradient' | 'dark'>('default');
  
  // QR Code
  const [qrCode, setQrCode] = useState<string | null>(null);
  
  useEffect(() => {
    if (id) {
      fetchCardData(id);
      generateQRCode(id);
    }
  }, [id]);
  
  const generateQRCode = async (cardId: string) => {
    try {
      const { data: card, error } = await supabase
        .from('business_cards')
        .select('slug')
        .eq('id', cardId)
        .single();

      if (error) throw error;
      if (!card) throw new Error('Card not found');

      const cardUrl = `${window.location.origin}/c/${card.slug}`;
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(cardUrl)}`;
      setQrCode(qrCodeUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };
  
  const fetchCardData = async (cardId: string) => {
    try {
      setLoading(true);
      
      // Fetch card data
      const { data: card, error: cardError } = await supabase
        .from('business_cards')
        .select('*')
        .eq('id', cardId)
        .single() as { data: BusinessCard | null, error: any };
      
      if (cardError) throw cardError;
      if (!card) throw new Error('Card not found');
      
      // Fetch social links
      const { data: socialLinks, error: socialsError } = await supabase
        .from('social_links')
        .select('*')
        .eq('card_id', cardId);
      
      if (socialsError) throw socialsError;
      
      // Fetch portfolio items
      const { data: portfolio, error: portfolioError } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('card_id', cardId);
      
      if (portfolioError) throw portfolioError;
      
      // Set card data
      setName(card.name || '');
      setTitle(card.title || '');
      setBio(card.bio || '');
      setPhoto(card.photo_url || '');
      setLocation(card.location || '');
      setEmail(card.email || '');
      setPhone(card.phone || '');
      setWebsite(card.website || '');
      setPublished(card.published !== false); // Default to true if undefined
      setLogo(card.logo_url || '');
      setVariant(card.template as 'default' | 'minimal' | 'gradient' | 'dark');
      
      // Set social links
      if (socialLinks) {
        setSocials(socialLinks.map(link => ({
          id: link.id,
          network: link.network as SocialNetwork,
          url: link.url
        })));
      }
      
      // Set portfolio items
      if (portfolio) {
        setPortfolioItems(portfolio.map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          link: item.link,
          image_url: item.image_url
        })));
      }
      
    } catch (error: any) {
      console.error('Error fetching card data:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les données de la carte",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSave = async () => {
    try {
      if (!id) return;
      
      setSaving(true);
      
      // Update card basic info
      const updateData: {
        name: string;
        title: string;
        bio: string;
        photo_url: string;
        logo_url: string;
        email: string;
        phone: string;
        location: string | null;
        website: string;
        published: boolean;
        template: 'default' | 'minimal' | 'gradient' | 'dark';
        updated_at: string;
        slug?: string;
      } = {
        name,
        title,
        bio,
        photo_url: photo,
        logo_url: logo,
        email,
        phone,
        location: location || null,
        website,
        published,
        template: variant,
        updated_at: new Date().toISOString()
      };

      // If the name has changed, update the slug
      if (name) {
        const baseSlug = name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 8)}`;
        updateData.slug = uniqueSlug;
      }

      const { error: updateError } = await supabase
        .from('business_cards')
        .update(updateData)
        .eq('id', id);

      if (updateError) throw updateError;

      // Update social links
      // First, delete existing social links
      const { error: deleteSocialsError } = await supabase
        .from('social_links')
        .delete()
        .eq('card_id', id);

      if (deleteSocialsError) throw deleteSocialsError;

      // Then, insert new social links
      if (socials.length > 0) {
        const socialLinks = socials
          .filter(social => social.url.trim() !== '')
          .map(social => ({
            card_id: id,
            network: social.network,
            url: social.url
          }));

        if (socialLinks.length > 0) {
          const { error: insertSocialsError } = await supabase
            .from('social_links')
            .insert(socialLinks);

          if (insertSocialsError) throw insertSocialsError;
        }
      }

      // Update portfolio items
      // First, delete existing portfolio items
      const { error: deletePortfolioError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('card_id', id);

      if (deletePortfolioError) throw deletePortfolioError;

      // Then, insert new portfolio items
      if (portfolioItems.length > 0) {
        const portfolioData = portfolioItems
          .filter(item => item.title.trim() !== '')
          .map(item => ({
            card_id: id,
            title: item.title,
            description: item.description || null,
            image_url: item.image_url || null,
            link: item.link || null
          }));

        if (portfolioData.length > 0) {
          const { error: insertPortfolioError } = await supabase
            .from('portfolio_items')
            .insert(portfolioData);

          if (insertPortfolioError) throw insertPortfolioError;
        }
      }

      toast({
        title: "Succès",
        description: "Votre carte a été mise à jour avec succès",
      });

      navigate(`/card/${id}`);
    } catch (error: any) {
      console.error('Error updating card:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour",
      });
    } finally {
      setSaving(false);
    }
  };
  
  const handleAddToContacts = () => {
    // Create vCard data
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${name}`,
      title ? `TITLE:${title}` : '',
      email ? `EMAIL:${email}` : '',
      phone ? `TEL:${phone}` : '',
      website ? `URL:https://${website}` : '',
      location ? `ADR:;;${location}` : '',
      'END:VCARD'
    ].join('\n');
    
    // Create a blob and download it
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.vcf`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Contact ajouté",
      description: "Le fichier vCard a été téléchargé"
    });
  };
  
  const handleSocialChange = (index: number, field: 'network' | 'url', value: string) => {
    const updatedSocials = [...socials];
    
    if (field === 'network') {
      updatedSocials[index] = {
        ...updatedSocials[index],
        network: value as SocialNetwork
      };
    } else {
      updatedSocials[index] = {
        ...updatedSocials[index],
        url: value
      };
    }
    
    setSocials(updatedSocials);
  };

  const addSocialLink = () => {
    setSocials([...socials, { network: 'github', url: '' }]);
  };

  const removeSocialLink = (index: number) => {
    const updatedSocials = socials.filter((_, i) => i !== index);
    setSocials(updatedSocials);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateChange = (newVariant: 'default' | 'minimal' | 'gradient' | 'dark') => {
    setVariant(newVariant);
  };
  
  // Portfolio management
  const handleAddPortfolioItem = () => {
    setPortfolioItems(prev => [...prev, { title: '', description: '', link: '' }]);
  };

  const handleRemovePortfolioItem = (index: number) => {
    setPortfolioItems(prev => prev.filter((_, i) => i !== index));
  };

  const handlePortfolioItemChange = (index: number, field: keyof PortfolioItem, value: string) => {
    const updatedPortfolio = [...portfolioItems];
    updatedPortfolio[index] = {
      ...updatedPortfolio[index],
      [field]: value
    };
    setPortfolioItems(updatedPortfolio);
  };

  const handlePortfolioImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "L'image ne doit pas dépasser 2MB",
          variant: "destructive"
        });
        return;
      }

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const updatedPortfolio = [...portfolioItems];
          updatedPortfolio[index] = {
            ...updatedPortfolio[index],
            image_url: reader.result as string
          };
          setPortfolioItems(updatedPortfolio);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error uploading portfolio image:', error);
        toast({
          title: "Erreur",
          description: "Impossible de télécharger l'image",
          variant: "destructive"
        });
      }
    }
  };

  const handleDeleteCard = async () => {
    if (!id) return;
    
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette carte ? Cette action est irréversible.")) {
      return;
    }
    
    try {
      setSaving(true);
      
      // Delete social links first
      const { error: socialsError } = await supabase
        .from('social_links')
        .delete()
        .eq('card_id', id);
      
      if (socialsError) throw socialsError;
      
      // Delete portfolio items
      const { error: portfolioError } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('card_id', id);
      
      if (portfolioError) throw portfolioError;
      
      // Finally delete the card
      const { error: cardError } = await supabase
        .from('business_cards')
        .delete()
        .eq('id', id);
      
      if (cardError) throw cardError;
      
      toast({
        title: "Carte supprimée",
        description: "Votre carte a été supprimée avec succès"
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
      
    } catch (error: any) {
      console.error('Error deleting card:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer la carte. Veuillez réessayer.",
      });
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <AnimatedBackground />
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gradient mb-8">Modifier Votre Carte de Visite Digitale</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form Section */}
              <div className="col-span-2 glass-morphism rounded-xl border border-white/20 p-6">
                {/* Tabs */}
                <div className="flex mb-6 border-b border-white/10 overflow-x-auto">
                  <TabButton 
                    label="Informations" 
                    active={activeTab === 'info'} 
                    onClick={() => setActiveTab('info')} 
                  />
                  <TabButton 
                    label="Réseaux Sociaux" 
                    active={activeTab === 'socials'} 
                    onClick={() => setActiveTab('socials')} 
                  />
                  <TabButton 
                    label="Design" 
                    active={activeTab === 'design'} 
                    onClick={() => setActiveTab('design')} 
                  />
                  <TabButton 
                    label="Portfolio" 
                    active={activeTab === 'portfolio'} 
                    onClick={() => setActiveTab('portfolio')} 
                  />
                </div>
                
                {/* Info Tab */}
                {activeTab === 'info' && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Nom complet</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                          placeholder="Jean Dupont" 
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-white">Titre ou Profession</Label>
                      <Input 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                          placeholder="Développeur Web" 
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" 
                        placeholder="jean.dupont@example.com" 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Téléphone</Label>
                      <Input 
                        id="phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="+33 6 12 34 56 78" 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white">Location</Label>
                      <Input 
                        id="location" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        placeholder="Paris, France" 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-white">Site Web</Label>
                      <Input 
                        id="website" 
                        value={website} 
                        onChange={(e) => setWebsite(e.target.value)} 
                        placeholder="www.monsite.com" 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="logo" className="text-white">Logo</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                          {logo ? (
                            <img 
                              src={logo} 
                              alt="Logo" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white/50">Logo</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <Input 
                            id="logo" 
                            type="file" 
                            accept="image/*"
                            className="bg-white/5 border-white/10 text-white"
                            onChange={handleLogoUpload}
                          />
                          <p className="text-xs text-white/50 mt-1">
                            Format: JPG, PNG. Taille max: 2MB
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-white">Biographie</Label>
                      <Textarea 
                        id="bio" 
                        value={bio} 
                        onChange={(e) => setBio(e.target.value)} 
                        placeholder="Parlez un peu de vous..." 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-32"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="photo" className="text-white">Photo de profil</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                          {photo ? (
                            <img 
                              src={photo} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white/50">Photo</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <Input 
                            id="photo" 
                            type="file" 
                            accept="image/*"
                            className="bg-white/5 border-white/10 text-white"
                            onChange={handlePhotoUpload}
                          />
                          <p className="text-xs text-white/50 mt-1">
                            Format: JPG, PNG. Taille max: 2MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Socials Tab */}
                {activeTab === 'socials' && (
                  <div className="space-y-6 animate-fade-in">
                    <p className="text-white/70 mb-4">
                      Ajoutez vos liens vers les réseaux sociaux pour les afficher sur votre carte.
                    </p>
                    
                    {socials.map((social, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-1/3">
                          <Label className="text-white mb-2 block">Réseau</Label>
                          <select 
                            value={social.network}
                            onChange={(e) => handleSocialChange(index, 'network', e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-md p-2 text-white"
                          >
                            <option value="facebook">Facebook</option>
                            <option value="twitter">Twitter</option>
                            <option value="instagram">Instagram</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="youtube">YouTube</option>
                            <option value="github">GitHub</option>
                            <option value="dribbble">Dribbble</option>
                            <option value="behance">Behance</option>
                            <option value="tiktok">TikTok</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="snapchat">Snapchat</option>
                          </select>
                        </div>
                        
                        <div className="flex-1">
                          <Label className="text-white mb-2 block">URL</Label>
                          <Input 
                            placeholder="https://"
                            value={social.url}
                            onChange={(e) => handleSocialChange(index, 'url', e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                          />
                        </div>
                        
                        <Button 
                          type="button" 
                          variant="destructive"
                          className="mt-8"
                          onClick={() => removeSocialLink(index)}
                        >
                          Supprimer
                        </Button>
                      </div>
                    ))}
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-2 border-white/20 text-white hover:bg-white/10"
                      onClick={addSocialLink}
                    >
                      + Ajouter un réseau social
                    </Button>
                  </div>
                )}
                
                {/* Design Tab */}
                {activeTab === 'design' && (
                  <div className="space-y-6 animate-fade-in">
                    <p className="text-white/70 mb-4">
                      Choisissez un modèle pour votre carte de visite.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        className={`p-4 rounded-lg cursor-pointer transition-all ${variant === 'default' ? 'ring-2 ring-purple-500' : 'hover:bg-white/5'}`}
                        onClick={() => handleTemplateChange('default')}
                      >
                        <div className="glass-morphism border border-white/20 rounded-lg p-3 mb-2">
                          <div className="aspect-[2/1] bg-gradient-to-br from-futuristic-purple/20 to-futuristic-blue/20 rounded flex items-center justify-center">
                            <span className="text-white font-medium">Futuriste</span>
                          </div>
                        </div>
                        <p className="text-sm text-white/70">Design moderne avec effets de verre et dégradés.</p>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-lg cursor-pointer transition-all ${variant === 'minimal' ? 'ring-2 ring-purple-500' : 'hover:bg-white/5'}`}
                        onClick={() => handleTemplateChange('minimal')}
                      >
                        <div className="bg-white border border-gray-200 rounded-lg p-3 mb-2">
                          <div className="aspect-[2/1] bg-gray-50 rounded flex items-center justify-center">
                            <span className="text-gray-800 font-medium">Minimal</span>
                          </div>
                        </div>
                        <p className="text-sm text-white/70">Design épuré avec fond blanc et typographie moderne.</p>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-lg cursor-pointer transition-all ${variant === 'gradient' ? 'ring-2 ring-purple-500' : 'hover:bg-white/5'}`}
                        onClick={() => handleTemplateChange('gradient')}
                      >
                        <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-lg p-3 mb-2">
                          <div className="aspect-[2/1] rounded flex items-center justify-center">
                            <span className="text-white font-medium">Gradient</span>
                          </div>
                        </div>
                        <p className="text-sm text-white/70">Design coloré avec dégradé dynamique.</p>
                      </div>
                      
                      <div 
                        className={`p-4 rounded-lg cursor-pointer transition-all ${variant === 'dark' ? 'ring-2 ring-purple-500' : 'hover:bg-white/5'}`}
                        onClick={() => handleTemplateChange('dark')}
                      >
                        <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 mb-2">
                          <div className="aspect-[2/1] rounded flex items-center justify-center">
                            <span className="text-white font-medium">Dark</span>
                          </div>
                        </div>
                        <p className="text-sm text-white/70">Design sombre et élégant.</p>
                      </div>
                  </div>
                </div>
                )}
                
                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-6 animate-fade-in">
                    <p className="text-white/70 mb-4">
                      Ajoutez des images et des descriptions à votre portfolio.
                    </p>
                    
                    {portfolioItems.map((item, index) => (
                      <div key={index} className="glass-morphism rounded-lg border border-white/10 p-4 space-y-4">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-white">Élément #{index + 1}</h3>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-white/20 text-white hover:bg-red-400/20 hover:text-red-400"
                            onClick={() => handleRemovePortfolioItem(index)}
                          >
                            Supprimer
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`portfolio-title-${index}`} className="text-white">Titre</Label>
                          <Input 
                            id={`portfolio-title-${index}`}
                            value={item.title}
                            onChange={(e) => handlePortfolioItemChange(index, 'title', e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                            placeholder="Nom du projet"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`portfolio-desc-${index}`} className="text-white">Description</Label>
                          <Textarea 
                            id={`portfolio-desc-${index}`}
                            value={item.description || ''}
                            onChange={(e) => handlePortfolioItemChange(index, 'description', e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-20"
                            placeholder="Description du projet"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`portfolio-link-${index}`} className="text-white">Lien (optionnel)</Label>
                          <Input 
                            id={`portfolio-link-${index}`}
                            value={item.link || ''}
                            onChange={(e) => handlePortfolioItemChange(index, 'link', e.target.value)}
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                            placeholder="https://"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`portfolio-image-${index}`} className="text-white">Image</Label>
                          <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center">
                              {item.image_url ? (
                                <img 
                                  src={item.image_url} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-white/50">Image</span>
                              )}
                            </div>
                            <div className="flex-1">
                              <Input 
                                id={`portfolio-image-${index}`}
                                type="file" 
                                accept="image/*"
                                className="bg-white/5 border-white/10 text-white"
                                onChange={(e) => handlePortfolioImageUpload(e, index)}
                              />
                              <p className="text-xs text-white/50 mt-1">
                                Format: JPG, PNG. Taille max: 2MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="mt-2 border-white/20 text-white hover:bg-white/10"
                      onClick={handleAddPortfolioItem}
                    >
                      + Ajouter un élément de portfolio
                    </Button>
                  </div>
                )}
                
                <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                  <div className="flex space-x-4">
                    <Button 
                      type="button"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                      onClick={() => setPreviewVisible(!previewVisible)}
                    >
                      {previewVisible ? "Masquer l'aperçu" : "Voir l'aperçu"}
                    </Button>
                    
                    <Button 
                      type="button"
                      variant="destructive"
                      className="border-red-500/20 text-red-500 hover:bg-red-500/10"
                      onClick={handleDeleteCard}
                      disabled={saving}
                    >
                      {saving ? "Suppression..." : "Supprimer la carte"}
                    </Button>
                  </div>
                  
                  <Button 
                    type="button"
                    className="bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple text-white"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? "Enregistrement..." : "Enregistrer la carte"}
                  </Button>
                </div>
              </div>
              
              {/* Preview Section */}
              <div className={`glass-morphism rounded-xl border border-white/20 p-6 ${previewVisible ? 'block' : 'hidden lg:block'}`}>
                  <h2 className="text-xl font-semibold text-gradient mb-4">Aperçu</h2>
                <div className="pt-4">
                  <BusinessCard 
                    name={name || "Votre Nom"}
                    title={title || "Votre Titre"}
                    phone={phone}
                    email={email}
                    location={location}
                    website={website}
                    photo={photo}
                    logo={logo}
                    socials={socials.filter(s => s.url)}
                    showQrCode={false}
                    variant={variant}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ label, active, onClick }: TabButtonProps) => (
  <button
    className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${
      active ? 'text-white border-b-2 border-futuristic-purple' : 'text-white/50 hover:text-white'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

export default EditCard;

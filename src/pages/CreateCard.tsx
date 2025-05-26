import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { BusinessCard } from '@/components/ui/business-card';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SocialNetwork } from '@/components/SocialIcons';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { uploadPortfolioImage } from '@/integrations/supabase/storage';
import { cn } from '@/lib/utils';

interface SocialLink {
  network: SocialNetwork;
  url: string;
}

interface PortfolioItem {
  id?: string;
  title: string;
  description: string;
  imageFile?: File;
  imageUrl?: string;
  link?: string;
}

interface CardFormData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  bio: string;
  photo: string;
  logo: string;
  variant: 'default' | 'minimal' | 'gradient' | 'dark';
  socials: SocialLink[];
  portfolio: PortfolioItem[];
}

const CreateCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CardFormData>({
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    bio: '',
    photo: '',
    logo: '',
    variant: 'default',
    socials: [
      { network: 'linkedin', url: '' },
      { network: 'twitter', url: '' },
      { network: 'instagram', url: '' },
      { network: 'facebook', url: '' }
    ],
    portfolio: []
  });

  const [activeTab, setActiveTab] = useState<'info' | 'socials' | 'portfolio' | 'design'>('info');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validation de format uniquement si le champ est rempli
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (formData.phone && !/^[\d\s+()-]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Format de téléphone invalide';
    }
    
    if (formData.website && !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(formData.website)) {
      newErrors.website = 'Format de site web invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSocialChange = (index: number, field: 'network' | 'url', value: string) => {
    const updatedSocials = [...formData.socials];
    
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
    
    setFormData(prev => ({
      ...prev,
      socials: updatedSocials
    }));
  };

  const addSocialLink = () => {
    setFormData(prev => ({
      ...prev,
      socials: [...prev.socials, { network: 'github', url: '' }]
    }));
  };

  const removeSocialLink = (index: number) => {
    const updatedSocials = formData.socials.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      socials: updatedSocials
    }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      setUploadProgress(0);
      const reader = new FileReader();
      
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      };
      
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result as string
        }));
        setUploadProgress(100);
        setTimeout(() => setUploadProgress(0), 1000);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

      setUploadProgress(0);
      const reader = new FileReader();
      
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          setUploadProgress(progress);
        }
      };
      
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          logo: reader.result as string
        }));
        setUploadProgress(100);
        setTimeout(() => setUploadProgress(0), 1000);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateChange = (variant: 'default' | 'minimal' | 'gradient' | 'dark') => {
    setFormData(prev => ({
      ...prev,
      variant
    }));
  };

  // Portfolio management
  const handleAddPortfolioItem = () => {
    setFormData(prev => ({
      ...prev,
      portfolio: [...prev.portfolio, { title: '', description: '', link: '' }]
    }));
  };

  const handleRemovePortfolioItem = (index: number) => {
    const updatedPortfolio = formData.portfolio.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      portfolio: updatedPortfolio
    }));
  };

  const handlePortfolioItemChange = (index: number, field: keyof PortfolioItem, value: string | File) => {
    const updatedPortfolio = [...formData.portfolio];
    
    if (field === 'imageFile' && value instanceof File) {
      updatedPortfolio[index] = {
        ...updatedPortfolio[index],
        imageFile: value
      };
    } else {
      updatedPortfolio[index] = {
        ...updatedPortfolio[index],
        [field]: value
      };
    }
    
    setFormData(prev => ({
      ...prev,
      portfolio: updatedPortfolio
    }));
  };

  const handlePortfolioImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedPortfolio = [...formData.portfolio];
        updatedPortfolio[index] = {
          ...updatedPortfolio[index],
          imageUrl: reader.result as string,
          imageFile: file
        };
        
        setFormData(prev => ({
          ...prev,
          portfolio: updatedPortfolio
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const saveCard = async () => {
    try {
      // Check if user is authenticated
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        toast({
          title: "Non connecté",
          description: "Veuillez vous connecter pour enregistrer votre carte",
          variant: "destructive"
        });
        navigate("/login");
        return;
      }
      
      setSaving(true);
      
      // Save card to Supabase
      const userId = session.session.user.id;
      
      // Generate a slug from the name
      const baseSlug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 8)}`;
      
      // 1. Insert the card
      const { data: cardData, error: cardError } = await supabase
        .from('business_cards')
        .insert({
          user_id: userId,
          name: formData.name || '',
          title: formData.title || '',
          email: formData.email || '',
          phone: formData.phone || '',
          location: formData.location || '',
          website: formData.website || '',
          bio: formData.bio || '',
          photo_url: formData.photo || '',
          logo_url: formData.logo || '',
          template: formData.variant,
          published: true,
          slug: uniqueSlug
        })
        .select()
        .single();
      
      if (cardError) {
        throw cardError;
      }
      
      // 2. Insert social links
      if (formData.socials.length > 0) {
        const socialLinks = formData.socials
          .filter(social => social.url.trim() !== '')
          .map(social => ({
            card_id: cardData.id,
            network: social.network,
            url: social.url
          }));
        
        if (socialLinks.length > 0) {
          const { error: socialsError } = await supabase
            .from('social_links')
            .insert(socialLinks);
          
          if (socialsError) {
            console.error('Error saving social links:', socialsError);
          }
        }
      }
      
      // 3. Insert portfolio items with image uploads
      if (formData.portfolio.length > 0) {
        setUploading(true);
        
        for (const item of formData.portfolio) {
          if (item.title) {
            let imageUrl = item.imageUrl;
            
            // Upload image if there's a file
            if (item.imageFile) {
              imageUrl = await uploadPortfolioImage(item.imageFile, cardData.id) || undefined;
            }
            
            // Insert portfolio item
            const { error: portfolioError } = await supabase
              .from('portfolio_items')
              .insert({
                card_id: cardData.id,
                title: item.title,
                description: item.description || null,
                image_url: imageUrl,
                link: item.link || null
              });
            
            if (portfolioError) {
              console.error('Error saving portfolio item:', portfolioError);
            }
          }
        }
        
        setUploading(false);
      }
      
      toast({
        title: "Carte enregistrée",
        description: "Votre carte a été créée avec succès",
      });
      
      navigate(`/c/${cardData.slug}`);
      
    } catch (error: any) {
      console.error('Error saving card:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'enregistrement",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gradient mb-8">Créer Votre Carte de Visite Digitale</h1>
            
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
                    label="Portfolio" 
                    active={activeTab === 'portfolio'} 
                    onClick={() => setActiveTab('portfolio')} 
                  />
                  <TabButton 
                    label="Design" 
                    active={activeTab === 'design'} 
                    onClick={() => setActiveTab('design')} 
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
                          name="name" 
                          placeholder="Jean Dupont" 
                          className={cn(
                            "bg-white/5 border-white/10 text-white placeholder:text-white/50",
                            errors.name && "border-red-500"
                          )}
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-white">Titre ou Profession</Label>
                        <Input 
                          id="title" 
                          name="title" 
                          placeholder="Développeur Web" 
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                          value={formData.title}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="jean.dupont@example.com" 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Téléphone</Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        placeholder="+33 6 12 34 56 78" 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-white">Location</Label>
                      <Input 
                        id="location" 
                        name="location" 
                        placeholder="Paris, France" 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-white">Site Web</Label>
                      <Input 
                        id="website" 
                        name="website" 
                        placeholder="www.monsite.com" 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                        value={formData.website}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="logo" className="text-white">Logo</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                          {formData.logo ? (
                            <img 
                              src={formData.logo} 
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
                            name="logo" 
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
                        name="bio" 
                        placeholder="Parlez un peu de vous..." 
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-32"
                        value={formData.bio}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="photo" className="text-white">Photo de profil</Label>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                          {formData.photo ? (
                            <img 
                              src={formData.photo} 
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
                            name="photo" 
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
                    
                    {formData.socials.map((social, index) => (
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
                        className={`p-4 rounded-lg cursor-pointer transition-all ${formData.variant === 'default' ? 'ring-2 ring-purple-500' : 'hover:bg-white/5'}`}
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
                        className={`p-4 rounded-lg cursor-pointer transition-all ${formData.variant === 'minimal' ? 'ring-2 ring-purple-500' : 'hover:bg-white/5'}`}
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
                        className={`p-4 rounded-lg cursor-pointer transition-all ${formData.variant === 'gradient' ? 'ring-2 ring-purple-500' : 'hover:bg-white/5'}`}
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
                        className={`p-4 rounded-lg cursor-pointer transition-all ${formData.variant === 'dark' ? 'ring-2 ring-purple-500' : 'hover:bg-white/5'}`}
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
                
                {/* Portfolio Tab - Updated */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-6 animate-fade-in">
                    <p className="text-white/70 mb-4">
                      Ajoutez des images et des descriptions à votre portfolio.
                    </p>
                    
                    {formData.portfolio.map((item, index) => (
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
                            value={item.description}
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
                              {item.imageUrl ? (
                                <img 
                                  src={item.imageUrl} 
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
                    className="bg-gradient-futuristic from-futuristic-purple to-futuristic-magenta hover:from-futuristic-magenta hover:to-futuristic-purple text-white"
                    onClick={saveCard}
                    disabled={saving || uploading}
                  >
                    {saving || uploading ? "Enregistrement..." : "Enregistrer la carte"}
                  </Button>
                </div>
              </div>
              
              {/* Preview Section */}
              <div className={`glass-morphism rounded-xl border border-white/20 p-6 ${previewVisible ? 'block' : 'hidden lg:block'}`}>
                <h2 className="text-xl font-semibold text-gradient mb-4">Aperçu</h2>
                <div className="pt-4">
                  <BusinessCard 
                    name={formData.name || "Votre Nom"}
                    title={formData.title || "Votre Titre"}
                    phone={formData.phone}
                    email={formData.email}
                    location={formData.location}
                    website={formData.website}
                    photo={formData.photo}
                    socials={formData.socials.filter(s => s.url)}
                    showQrCode={false}
                    variant={formData.variant}
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

export default CreateCard;

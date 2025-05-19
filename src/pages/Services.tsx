
import MainLayout from "@/components/layouts/MainLayout";
import CategoryItem from "@/components/services/CategoryItem";
import ServiceCard, { ServiceCardProps } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Code, Edit, Filter, Lightbulb, MusicIcon, Search, Star, Wand } from "lucide-react";
import { useState } from "react";

// Mock data for demonstration purposes
const mockCategories = [
  { icon: <Edit size={20} />, label: 'Writing' },
  { icon: <Code size={20} />, label: 'Programming' },
  { icon: <MusicIcon size={20} />, label: 'Music' },
  { icon: <BookOpen size={20} />, label: 'Tutoring' },
  { icon: <Lightbulb size={20} />, label: 'Consulting' },
];

const mockServices: ServiceCardProps[] = [
  {
    id: '1',
    title: 'Professional Content Writing',
    description: 'High-quality blog posts, articles, and web content tailored to your needs.',
    price: 50,
    rating: 4.8,
    reviewCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
    vendorName: 'Emma Johnson',
    vendorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    category: 'Writing',
    isTrending: true,
  },
  {
    id: '2',
    title: 'Full Stack Web Development',
    description: 'Custom websites and web applications built with modern technologies.',
    price: 120,
    rating: 4.9,
    reviewCount: 87,
    imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159',
    vendorName: 'Michael Chen',
    vendorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    category: 'Programming',
    isRecommended: true,
  },
  {
    id: '3',
    title: 'Guitar Lessons for Beginners',
    description: 'Learn guitar fundamentals with personalized online lessons.',
    price: 35,
    rating: 4.7,
    reviewCount: 56,
    imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1',
    vendorName: 'Sofia Rodriguez',
    category: 'Music',
  },
  {
    id: '4',
    title: 'Mathematics Tutoring',
    description: 'Expert help with algebra, calculus, and statistics for students of all levels.',
    price: 45,
    rating: 4.9,
    reviewCount: 112,
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
    vendorName: 'David Kumar',
    vendorAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    category: 'Tutoring',
  },
  {
    id: '5',
    title: 'Business Strategy Consulting',
    description: 'Strategic planning and growth advice for small to medium businesses.',
    price: 150,
    rating: 4.8,
    reviewCount: 34,
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7',
    vendorName: 'Alexandra Wright',
    vendorAvatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    category: 'Consulting',
    isTrending: true,
  },
];

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services based on selected category and search query
  const filteredServices = mockServices.filter(service => {
    const matchesCategory = !activeCategory || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const trendingServices = mockServices.filter(service => service.isTrending);
  const recommendedServices = mockServices.filter(service => service.isRecommended);

  const header = (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Discover Services</h1>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for services..."
          className="pl-9 pr-12"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-1 top-1"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <MainLayout header={header}>
      <Tabs defaultValue="all" className="w-full">
        <div className="sticky top-[65px] bg-background z-10 border-b">
          <TabsList className="w-full justify-start p-0 h-12">
            <TabsTrigger 
              value="all" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="trending" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Trending
            </TabsTrigger>
            <TabsTrigger 
              value="foryou" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              For You
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4">
          <ScrollArea className="w-full" orientation="horizontal">
            <div className="flex gap-4 pb-2 min-w-max">
              {mockCategories.map((category, index) => (
                <CategoryItem
                  key={index}
                  icon={category.icon}
                  label={category.label}
                  isActive={activeCategory === category.label}
                  onClick={() => {
                    if (activeCategory === category.label) {
                      setActiveCategory(null);
                    } else {
                      setActiveCategory(category.label);
                    }
                  }}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        <TabsContent value="all" className="m-0">
          <div className="grid grid-cols-2 gap-4 p-4">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="m-0">
          <div className="grid grid-cols-2 gap-4 p-4">
            {trendingServices.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="foryou" className="m-0">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Wand className="h-5 w-5 text-primary" />
              <h2 className="font-medium">AI Recommended for You</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {recommendedServices.map((service) => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ServicesPage;

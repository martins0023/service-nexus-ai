
import MainLayout from "@/components/layouts/MainLayout";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CreditCard, Languages, Lock, LogOut, Moon, Settings, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { toast } = useToast();
  
  // Mock user data
  const userData = {
    name: "John Smith",
    avatarUrl: "https://randomuser.me/api/portraits/men/42.jpg",
    bio: "App Developer & Designer",
    isVendor: false,
    stats: {
      completedJobs: 12,
      savedVendors: 5
    }
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };
  
  return (
    <MainLayout>
      <ProfileHeader
        name={userData.name}
        avatarUrl={userData.avatarUrl}
        bio={userData.bio}
        isVendor={userData.isVendor}
        stats={userData.stats}
      />
      
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w-full justify-between p-0 h-12 border-b bg-background">
          <TabsTrigger 
            value="account" 
            className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Account
          </TabsTrigger>
          <TabsTrigger 
            value="settings" 
            className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="m-0">
          <div className="p-4 space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-2">MY ACCOUNT</h3>
            
            <Button variant="ghost" className="w-full justify-start pl-2" asChild>
              <div className="flex items-center">
                <User size={18} className="mr-3" />
                <span>Personal Information</span>
              </div>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start pl-2" asChild>
              <div className="flex items-center">
                <CreditCard size={18} className="mr-3" />
                <span>Payment Methods</span>
              </div>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start pl-2" asChild>
              <div className="flex items-center">
                <Bell size={18} className="mr-3" />
                <span>Notifications</span>
              </div>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start pl-2" asChild>
              <div className="flex items-center">
                <Lock size={18} className="mr-3" />
                <span>Privacy & Security</span>
              </div>
            </Button>
            
            <div className="pt-4 border-t">
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={handleLogout}
              >
                <LogOut size={18} className="mr-2" />
                Log Out
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="m-0">
          <div className="p-4 space-y-4">
            <h3 className="font-medium text-sm text-muted-foreground mb-2">APP SETTINGS</h3>
            
            <Button variant="ghost" className="w-full justify-start pl-2" asChild>
              <div className="flex items-center">
                <Moon size={18} className="mr-3" />
                <span>Appearance</span>
              </div>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start pl-2" asChild>
              <div className="flex items-center">
                <Languages size={18} className="mr-3" />
                <span>Language</span>
              </div>
            </Button>
            
            <Button variant="ghost" className="w-full justify-start pl-2" asChild>
              <div className="flex items-center">
                <Settings size={18} className="mr-3" />
                <span>Advanced Settings</span>
              </div>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ProfilePage;

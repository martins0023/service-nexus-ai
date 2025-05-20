
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatically redirect to services page
    navigate("/services");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Project Ace
        </h1>
        <p className="text-xl text-muted-foreground">
          Connect with top services and vendors
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => navigate("/services")} 
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Explore Services
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/chats")}
          >
            View Messages
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;


import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center space-y-6">
        <div className="bg-muted w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">404</span>
        </div>
        <h1 className="text-2xl font-bold">Page not found</h1>
        <p className="text-muted-foreground max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <Button onClick={() => navigate("/")} className="mt-8">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

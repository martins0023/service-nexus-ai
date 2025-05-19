
import React from 'react';
import BottomNavigation from './BottomNavigation';

interface MainLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  header?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showNav = true,
  header
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {header && (
        <header className="sticky top-0 z-20 bg-background border-b border-border">
          {header}
        </header>
      )}
      
      <main className="flex-1 pb-16">
        {children}
      </main>
      
      {showNav && <BottomNavigation />}
    </div>
  );
};

export default MainLayout;

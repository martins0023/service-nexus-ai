
import { MessageSquare, Compass, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    { 
      name: 'Chats', 
      icon: MessageSquare, 
      path: '/chats',
      active: currentPath.includes('/chats')
    },
    { 
      name: 'Services', 
      icon: Compass, 
      path: '/services',
      active: currentPath.includes('/services') || currentPath === '/'
    },
    { 
      name: 'Profile', 
      icon: User, 
      path: '/profile',
      active: currentPath.includes('/profile')
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center h-16 z-10">
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={cn(
            "bottom-tab", 
            item.active ? "bottom-tab-active" : "bottom-tab-inactive"
          )}
        >
          <item.icon size={24} />
          <span className="text-xs">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;

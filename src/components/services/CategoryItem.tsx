
import { cn } from '@/lib/utils';
import React from 'react';

interface CategoryItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "bg-transparent text-foreground hover:bg-muted"
      )}
    >
      <div className={cn(
        "p-2 rounded-full mb-1",
        isActive ? "bg-primary/20" : "bg-muted"
      )}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

export default CategoryItem;

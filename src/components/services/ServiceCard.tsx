
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  vendorName: string;
  vendorAvatar?: string;
  category: string;
  isTrending?: boolean;
  isRecommended?: boolean;
}

const ServiceCard = ({
  id,
  title,
  description,
  price,
  rating,
  reviewCount,
  imageUrl,
  vendorName,
  vendorAvatar,
  isTrending,
  isRecommended
}: ServiceCardProps) => {
  return (
    <Link to={`/services/${id}`} className="block">
      <div className="service-card overflow-hidden">
        <div className="relative">
          {/* Image */}
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-40 object-cover" 
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {isTrending && (
              <Badge variant="trending">Trending</Badge>
            )}
            
            {isRecommended && (
              <Badge variant="secondary">For You</Badge>
            )}
          </div>
        </div>
        
        <div className="p-3">
          {/* Title and Price */}
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-base line-clamp-1">{title}</h3>
            <span className="font-semibold">${price}</span>
          </div>
          
          {/* Vendor */}
          <div className="flex items-center gap-1 mb-1">
            {vendorAvatar ? (
              <img 
                src={vendorAvatar} 
                alt={vendorName} 
                className="w-4 h-4 rounded-full object-cover" 
              />
            ) : (
              <div className="w-4 h-4 rounded-full bg-muted-foreground/20" />
            )}
            <span className="text-xs text-muted-foreground">{vendorName}</span>
          </div>
          
          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {description}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;

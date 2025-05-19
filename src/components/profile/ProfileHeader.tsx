
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileHeaderProps {
  name: string;
  avatarUrl?: string;
  bio?: string;
  isVendor: boolean;
  stats: {
    services?: number;
    completedJobs?: number;
    savedVendors?: number;
    rating?: number;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  avatarUrl,
  bio,
  isVendor,
  stats
}) => {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="px-4 py-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-4 items-center">
          <Avatar className="h-16 w-16">
            {avatarUrl && <AvatarImage src={avatarUrl} />}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="font-semibold text-lg">{name}</h2>
            {bio && <p className="text-sm text-muted-foreground">{bio}</p>}
          </div>
        </div>
        
        <Link to="/profile/settings">
          <Button variant="outline" size="icon">
            <Settings size={18} />
            <span className="sr-only">Settings</span>
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        {isVendor ? (
          <>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-lg font-semibold">{stats.services || 0}</p>
              <p className="text-xs text-muted-foreground">Services</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-lg font-semibold">{stats.completedJobs || 0}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-lg font-semibold">{stats.rating?.toFixed(1) || '0.0'}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-lg font-semibold">{stats.completedJobs || 0}</p>
              <p className="text-xs text-muted-foreground">Hires</p>
            </div>
            <div className="bg-muted rounded-lg p-3 text-center">
              <p className="text-lg font-semibold">{stats.savedVendors || 0}</p>
              <p className="text-xs text-muted-foreground">Saved</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;

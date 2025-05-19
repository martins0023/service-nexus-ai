
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, CheckCheck, ChevronLeft, MessageSquarePlus, Search } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ChatPreview {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isRead: boolean;
  isVendor: boolean;
}

// Mock data
const mockChats: ChatPreview[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'I can deliver the articles by Friday.',
    timestamp: new Date(Date.now() - 25 * 60000), // 25 minutes ago
    unreadCount: 2,
    isRead: false,
    isVendor: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Your website is now live! Check it out.',
    timestamp: new Date(Date.now() - 3 * 3600000), // 3 hours ago
    unreadCount: 0,
    isRead: true,
    isVendor: true
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    lastMessage: 'Looking forward to our next lesson.',
    timestamp: new Date(Date.now() - 1 * 86400000), // 1 day ago
    unreadCount: 0,
    isRead: true,
    isVendor: true
  },
  {
    id: '4',
    name: 'David Kumar',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    lastMessage: 'Let me know if you have questions about the calculus problem.',
    timestamp: new Date(Date.now() - 2 * 86400000), // 2 days ago
    unreadCount: 0,
    isRead: true,
    isVendor: true
  },
  {
    id: '5',
    name: 'Alexandra Wright',
    avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    lastMessage: 'I've reviewed your business plan and have some feedback.',
    timestamp: new Date(Date.now() - 4 * 86400000), // 4 days ago
    unreadCount: 0,
    isRead: true,
    isVendor: true
  }
];

const formatMessageDate = (date: Date) => {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return format(date, 'h:mm a');
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return format(date, 'EEE'); // Day of week
  } else {
    return format(date, 'MM/dd/yy');
  }
};

const ChatsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredChats = mockChats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const vendorChats = filteredChats.filter(chat => chat.isVendor);
  const clientChats = filteredChats.filter(chat => !chat.isVendor);
  
  const header = (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Messages</h1>
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
  
  const renderChatItem = (chat: ChatPreview) => (
    <Link to={`/chats/${chat.id}`} key={chat.id} className="block">
      <div className={cn(
        "flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors",
        chat.unreadCount > 0 ? "bg-primary/5" : ""
      )}>
        <Avatar>
          {chat.avatar && <AvatarImage src={chat.avatar} />}
          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline">
            <h3 className={cn(
              "font-medium truncate",
              chat.unreadCount > 0 ? "font-semibold" : ""
            )}>
              {chat.name}
            </h3>
            <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
              {formatMessageDate(chat.timestamp)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <p className={cn(
              "text-sm truncate",
              chat.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
            )}>
              {chat.lastMessage}
            </p>
            <div className="flex items-center ml-2 flex-shrink-0">
              {chat.unreadCount > 0 ? (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unreadCount}
                </span>
              ) : (
                chat.isRead ? <CheckCheck size={16} className="text-muted-foreground" /> : <Check size={16} className="text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
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
              All Chats
            </TabsTrigger>
            <TabsTrigger 
              value="vendors" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Vendors
            </TabsTrigger>
            <TabsTrigger 
              value="clients" 
              className="flex-1 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Clients
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="m-0 divide-y">
          {filteredChats.length > 0 ? (
            filteredChats.map(renderChatItem)
          ) : (
            <div className="text-center p-8">
              <MessageSquarePlus className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <h3 className="font-medium mb-1">No conversations yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start a conversation with a service provider
              </p>
              <Button asChild>
                <Link to="/services">Browse Services</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="vendors" className="m-0 divide-y">
          {vendorChats.length > 0 ? (
            vendorChats.map(renderChatItem)
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No vendor conversations</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="clients" className="m-0 divide-y">
          {clientChats.length > 0 ? (
            clientChats.map(renderChatItem)
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">No client conversations</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ChatsPage;

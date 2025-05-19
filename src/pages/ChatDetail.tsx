
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import ChatMessage, { ChatMessageProps } from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock chat data
const mockUsers = [
  {
    id: '1',
    name: 'Emma Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
  },
  {
    id: '4',
    name: 'David Kumar',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  },
  {
    id: '5',
    name: 'Alexandra Wright',
    avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
  }
];

type Message = Omit<ChatMessageProps, 'isCurrentUser'>;

// Generate mock messages for a specific chat
const generateMockMessages = (chatId: string): Message[] => {
  const currentUserId = 'current-user';
  const otherUserId = chatId;
  
  const messages: Message[] = [
    {
      id: '1',
      content: 'Hello! I saw your profile and I'm interested in your services.',
      senderId: currentUserId,
      receiverId: otherUserId,
      timestamp: new Date(Date.now() - 60 * 60000), // 60 minutes ago
      isRead: true,
    },
    {
      id: '2',
      content: 'Hi there! Thanks for reaching out. I'd be happy to help with your project.',
      senderId: otherUserId,
      receiverId: currentUserId,
      timestamp: new Date(Date.now() - 55 * 60000), // 55 minutes ago
      isRead: true,
    },
    {
      id: '3',
      content: 'Could you tell me more about what you need?',
      senderId: otherUserId,
      receiverId: currentUserId,
      timestamp: new Date(Date.now() - 54 * 60000), // 54 minutes ago
      isRead: true,
    },
    {
      id: '4',
      content: 'I need help with a project that requires your expertise. Here are some details:',
      senderId: currentUserId,
      receiverId: otherUserId,
      timestamp: new Date(Date.now() - 50 * 60000), // 50 minutes ago
      isRead: true,
    },
    {
      id: '5',
      content: 'I need it completed within 2 weeks. Is that possible?',
      senderId: currentUserId,
      receiverId: otherUserId,
      timestamp: new Date(Date.now() - 49 * 60000), // 49 minutes ago
      isRead: true,
    },
    {
      id: '6',
      content: 'Yes, that timeline works for me. I can start right away.',
      senderId: otherUserId,
      receiverId: currentUserId,
      timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
      isRead: true,
    },
    {
      id: '7',
      content: 'Here's an example of my previous work:',
      senderId: otherUserId,
      receiverId: currentUserId,
      timestamp: new Date(Date.now() - 44 * 60000), // 44 minutes ago
      isRead: true,
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
        }
      ]
    },
    {
      id: '8',
      content: 'That looks great! How much would you charge for this project?',
      senderId: currentUserId,
      receiverId: otherUserId,
      timestamp: new Date(Date.now() - 40 * 60000), // 40 minutes ago
      isRead: true,
    },
    {
      id: '9',
      content: 'Based on your requirements, I would charge $500 for the complete project.',
      senderId: otherUserId,
      receiverId: currentUserId,
      timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      isRead: true,
    },
    {
      id: '10',
      content: 'That works for me. Let's proceed!',
      senderId: currentUserId,
      receiverId: otherUserId,
      timestamp: new Date(Date.now() - 25 * 60000), // 25 minutes ago
      isRead: false,
    }
  ];
  
  return messages;
};

const ChatDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<typeof mockUsers[0] | null>(null);
  
  useEffect(() => {
    if (id) {
      // Find the user for this chat
      const foundUser = mockUsers.find(u => u.id === id);
      setUser(foundUser || null);
      
      // Get chat messages
      const chatMessages = generateMockMessages(id);
      setMessages(chatMessages);
    }
  }, [id]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (content: string) => {
    if (!id) return;
    
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      content,
      senderId: 'current-user',
      receiverId: id,
      timestamp: new Date(),
      isRead: false,
    };
    
    setMessages([...messages, newMessage]);
  };
  
  const handleBack = () => {
    navigate('/chats');
  };
  
  const header = user && (
    <div className="flex items-center justify-between p-2 h-14">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center ml-1">
          <Avatar className="h-8 w-8 mr-2">
            {user.avatar && <AvatarImage src={user.avatar} />}
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div>
            <h3 className="font-medium text-sm">{user.name}</h3>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
  
  const currentUserId = 'current-user';
  
  return (
    <MainLayout header={header} showNav={false}>
      <div className="flex flex-col h-[calc(100vh-112px)]">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(message => (
            <ChatMessage
              key={message.id}
              {...message}
              isCurrentUser={message.senderId === currentUserId}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat input */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          onAttachFile={() => console.log('Attach file')} 
        />
      </div>
    </MainLayout>
  );
};

export default ChatDetailPage;

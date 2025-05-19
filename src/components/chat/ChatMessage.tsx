
import { cn } from '@/lib/utils';
import { Check, CheckCheck } from 'lucide-react';
import { format } from 'date-fns';

export interface ChatMessageProps {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  isRead: boolean;
  isCurrentUser: boolean;
  media?: {
    type: 'image' | 'document';
    url: string;
    name?: string;
  }[];
}

const ChatMessage = ({
  content,
  timestamp,
  isRead,
  isCurrentUser,
  media
}: ChatMessageProps) => {
  return (
    <div className={cn(
      "flex mb-2",
      isCurrentUser ? "justify-end" : "justify-start"
    )}>
      <div className="flex flex-col">
        <div className={cn(
          isCurrentUser ? "chat-bubble-client" : "chat-bubble-vendor"
        )}>
          {content}
          
          {media && media.length > 0 && (
            <div className="mt-2">
              {media.map((item, index) => (
                item.type === 'image' ? (
                  <img 
                    key={index} 
                    src={item.url} 
                    alt="Shared media" 
                    className="rounded-md max-h-40 object-contain" 
                  />
                ) : (
                  <a 
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex items-center bg-background/10 p-2 rounded-md"
                  >
                    <div className="truncate">{item.name}</div>
                  </a>
                )
              ))}
            </div>
          )}
        </div>

        <div className={cn(
          "flex items-center text-xs mt-1",
          isCurrentUser ? "justify-end" : "justify-start",
          "text-muted-foreground"
        )}>
          {format(timestamp, 'h:mm a')}
          {isCurrentUser && (
            <span className="ml-1">
              {isRead ? <CheckCheck size={14} /> : <Check size={14} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;

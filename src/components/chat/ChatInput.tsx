
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Paperclip, Send, Smile } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onAttachFile?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onAttachFile }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 p-2 bg-background border-t border-border"
    >
      <Button 
        type="button" 
        variant="ghost" 
        size="icon" 
        className="flex-shrink-0"
        onClick={onAttachFile}
      >
        <Paperclip className="h-5 w-5" />
        <span className="sr-only">Attach file</span>
      </Button>
      
      <Input
        type="text"
        placeholder="Type a message..."
        className="flex-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      
      <Button 
        type="button" 
        variant="ghost" 
        size="icon" 
        className="flex-shrink-0"
      >
        <Smile className="h-5 w-5" />
        <span className="sr-only">Emoji</span>
      </Button>
      
      <Button 
        type="submit" 
        className="flex-shrink-0 rounded-full" 
        size="icon"
        disabled={!message.trim()}
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
};

export default ChatInput;

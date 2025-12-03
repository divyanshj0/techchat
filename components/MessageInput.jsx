import { useState, KeyboardEvent } from 'react';
import { Send, Smile } from 'lucide-react';

export function MessageInput({ onSend, placeholder, disabled }) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-border">
      <div className="flex items-end gap-2 bg-secondary rounded-lg p-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || 'Type a message...'}
          disabled={disabled}
          className="min-h-10 max-h-[120px] bg-transparent border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 flex w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring"
          rows={1}
        />
        <div className="flex items-center gap-1">
          <button 
            className="h-8 w-8 text-muted-foreground hover:text-foreground inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent"
          >
            <Smile className="h-5 w-5" />
          </button>
          <button 
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="h-8 w-8 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 px-2">
        Press Enter to send, Shift + Enter for new line
      </p>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { Hash, Lock, Users } from 'lucide-react';
import MessageList from './MessageList';
import { MessageInput } from './MessageInput';
import { ChannelMembers } from './ChannelMembers';

export default function ChatArea({ channel }) {
    const [messages, setMessages] = useState([]);
    const [profiles, setProfiles] = useState({});
    const [showMembers, setShowMembers] = useState(false);
    

    // Mock current user
    const currentUser = { id: 'user1', username: 'johndoe' };

    useEffect(() => {
        if (channel?.name === 'channel2') {
            // 1. Define mock profiles for the users in this chat
            const mockProfiles = {
                'user1': { username: 'johndoe', status: 'online' },
                'user2': { username: 'johndoe2', status: 'online' }
            };
            setProfiles(mockProfiles);

            // 2. Set messages with 'created_at' (ISO string) and 'user_id'
            setMessages([
                { 
                    id: 1, 
                    content: 'heelo', 
                    user_id: 'user1', // Matches currentUser.id (isOwn = true)
                    created_at: new Date('2025-12-03T14:48:00').toISOString(),
                },
                { 
                    id: 2, 
                    content: 'hello', 
                    user_id: 'user2', // Different ID (isOwn = false)
                    created_at: new Date('2025-12-03T15:06:00').toISOString(),
                }
            ]);
        } else {
            setMessages([]);
        }
    }, [channel]);

    const handleSendMessage = (text) => {
        const newMessage = {
            id: messages.length + 1,
            content: text,
            user_id: currentUser.id,
            created_at: new Date().toISOString(),
        };
        setMessages([...messages, newMessage]);
    };

    if (!channel) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background">
                <div className="text-center text-muted-foreground">
                    <Hash className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Select a channel</p>
                    <p className="text-sm">Choose a channel from the sidebar to start chatting</p>
                </div>
            </div>
        );
    }
    return (
        <div className="flex-1 flex flex-col bg-background">
            {/* Channel Header */}
            <div className="h-14 px-4 flex items-center justify-between border-b border-border glass-panel">
                <div className="flex items-center gap-3">
                    {channel.is_private ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                    ) : (
                        <Hash className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                        <h2 className="font-semibold">{channel.name}</h2>
                        {channel.description && (
                            <p className="text-xs text-muted-foreground truncate max-w-md">
                                {channel.description}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="text-muted-foreground hover:text-foreground hover:bg-accent h-9 px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        onClick={() => setShowMembers(true)}
                    >
                        <Users className="h-4 w-4 mr-2" />
                        <span>2</span>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <MessageList
                messages={messages}
                profiles={profiles}
                user={currentUser} 
            />

            {/* Message Input */}
            <MessageInput
                onSend={handleSendMessage}
                placeholder={`Message #${channel.name}`}
            />

            <ChannelMembers
                open={showMembers}
                onOpenChange={setShowMembers}
                channel={channel}
            />
        </div>
    );
}
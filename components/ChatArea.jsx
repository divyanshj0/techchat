import { useState, useEffect, useCallback } from 'react';
import { Hash, Lock, Users, Settings } from 'lucide-react';
import MessageList from './MessageList';
import { MessageInput } from './MessageInput';
import { ChannelMembers } from './ChannelMembers';
const PAGE_SIZE = 50;
export default function ChatArea({ channel }) {
    const [messages, setMessages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [profiles, setProfiles] = useState({})
    const [showMembers, setShowMembers] = useState(false);
    const [memberCount, setMemberCount] = useState(0);
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        if (channel?.name === 'channel2') {
            setMessages([
                { 
                    id: 1, 
                    content: 'heelo', 
                    sender: { username: 'johndoe', avatarColor: 'bg-blue-600' }, 
                    timestamp: '1764753480',
                    isOwn: true 
                },
                { 
                    id: 2, 
                    content: 'hello', 
                    sender: { username: 'johndoe2', avatarColor: 'bg-zinc-700' }, 
                    timestamp: '1764754080',
                    isOwn: false 
                }
            ]);
        } else {
            setMessages([]);
        }
    }, [channel]);
    const fetchProfiles = async () => {
        alert('profies fetched successfully');
    }
    const fetchMessages = async () => {
        alert('message fetched successfuly');
    }
    const fetchMemberCount = async () => {
        alert('member count fetched successfully');
    }
    const handleSendMessage = (text) => {
        const newMessage = {
            id: messages.length + 1,
            content: text,
            sender: { username: 'johndoe', avatarColor: 'bg-blue-600' },
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true
        };
        setMessages([...messages, newMessage]);
    };
    const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchMessages(messages.length);
    }
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
                        {memberCount}
                    </button>
                </div>
            </div>

            {/* Messages */}
            <MessageList
                messages={messages}
                profiles={profiles}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
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

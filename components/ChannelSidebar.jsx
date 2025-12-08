"use client";
import { useEffect, useState } from 'react';
import { Hash, Plus, Users, LogOut, Search } from 'lucide-react';
import * as ScrollArea from "@radix-ui/react-scroll-area";
import CreateChannel from './CreateChannel';
import { useRouter } from 'next/navigation';
import * as Avatar from '@radix-ui/react-avatar';
import { ChannelList } from './ChannelList';
export default function ChannelSidebar({ channels, activeChannel, onSelectChannel, oncreateChannel }) {
    const [showCreateChannel, setShowCreateChannel] = useState(false);
    const [showChannelList, setShowChannelList] = useState(false);
    const publicChannels = channels.filter(c => !c.is_private);
    const privateChannels = channels.filter(c => c.is_private);
    const [onlineUsers, setOnlineUsers] = useState([])
    const [username,setUsername]=useState('')
    const router = useRouter()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('session expired');
            router.replace('/auth');
        }
        setUsername(user.username)
    }, [])
    const handleSignout = async (e) => {
        localStorage.clear();
        router.push('/')
    }
    return (
        <div className="w-64 bg-sidebar flex flex-col border-r border-sidebar-border">
            {/* Header */}
            <div className="p-4 border-b border-sidebar-border">
                <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">TC</span>
                    </div>
                    TechChat
                </h1>
            </div>

            <ScrollArea.Root className="flex-1 px-2 relative overflow-hidden">
                {/* Public Channels */}
                <div className="py-4">
                    <div className="flex items-center justify-between px-2 mb-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Public Channels
                        </span>
                        <div className='flex gap-2 items-center'>
                            <button
                                className="h-4 w-4 text-muted-foreground hover:scale-125 cursor-pointer"
                                onClick={() => setShowChannelList(true)}
                            >
                                <Search className="h-4 w-4" />
                            </button>
                            <button
                                className="h-4 w-4 text-muted-foreground hover:scale-125 cursor-pointer "
                                onClick={() => setShowCreateChannel(true)}
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-1">
                        {publicChannels.map((channel) => (
                            <button
                                key={channel.id}
                                onClick={() => onSelectChannel(channel)}
                                className={`channel-item w-full text-left ${activeChannel?.id === channel.id && "channel-item-active"}`}
                            >
                                <Hash className="h-4 w-4 text-muted-foreground" />
                                <span className="truncate">{channel.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Private Channels */}
                {privateChannels.length > 0 && (
                    <div className="py-4 border-t border-sidebar-border">
                        <div className="flex items-center justify-between px-2 mb-2">
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Private Channels
                            </span>
                        </div>
                        <div className="space-y-1">
                            {privateChannels.map((channel) => (
                                <button key={channel.id} onClick={() => onSelectChannel(channel)}
                                    className={`channel-item w-full text-left ${activeChannel?.id === channel.id && "channel-item-active"}`}
                                >
                                    <Hash className="h-4 w-4 text-muted-foreground" />
                                    <span className="truncate">{channel.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Online Users */}
                <div className="py-4 border-t border-sidebar-border">
                    <div className="flex items-center gap-2 px-2 mb-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Online — {onlineUsers.length}
                        </span>
                    </div>
                    <div className="space-y-1">
                        {onlineUsers.slice(0, 10).map((user) => (
                            <div key={user.id} className="flex items-center gap-2 px-2 py-1.5">
                                <div className="relative">
                                    <Avatar.Root className="h-6 w-6 relative flex shrink-0 overflow-hidden rounded-full">
                                        <Avatar.Fallback className="bg-secondary text-xs flex h-full w-full items-center justify-center rounded-full">
                                            {user.username.charAt(0).toUpperCase()}
                                        </Avatar.Fallback>
                                    </Avatar.Root>
                                    <div className="absolute -bottom-0.5 -right-0.5 presence-dot presence-online" />
                                </div>
                                <span className="text-sm text-muted-foreground truncate">
                                    {user.username}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollArea.Root>

            {/* User Section */}
            <div className="p-3 border-t border-sidebar-border bg-sidebar-accent/30">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="h-8 w-8 relative flex shrink-0 overflow-hidden rounded-full">
                            <div className="bg-primary text-primary-foreground flex h-full w-full items-center justify-center rounded-full">
                                {'U'}
                            </div>
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 presence-dot presence-online" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{username}</p>
                        <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                    <button
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={handleSignout}
                    >
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <CreateChannel
                open={showCreateChannel}
                onOpenChange={setShowCreateChannel}
                onCreateChannel={oncreateChannel}
            />
            <ChannelList
                open={showChannelList}
                onOpenChange={setShowChannelList}
                joinedChannels={channels}
            />
        </div>
    )
}

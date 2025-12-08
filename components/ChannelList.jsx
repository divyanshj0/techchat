import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { Hash, Search, Check, X } from 'lucide-react';
import * as ScrollArea from "@radix-ui/react-scroll-area";
import axios from 'axios';

export function ChannelList({ open, onOpenChange, joinedChannels }) {
    const [search, setSearch] = useState('');
    const [channels, setChannels] = useState([]);
    const [joinedChannelIds, setJoinedChannelIds] = useState(new Set());
    const [loading, setLoading] = useState(false);
    const [joining, setJoining] = useState(null);
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    useEffect(() => {
        if (open) {
            setLoading(true);
            if (joinedChannels.length > 0) {
                const ids = new Set(joinedChannels.map(ch => ch.id));
                setJoinedChannelIds(ids);
            }
            fetchChannels();
        }
    }, [open, joinedChannels]);

    const fetchChannels = async () => {
        const token = localStorage.getItem('token');
        const channels = await axios.get(`${url}/api/channels`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        setChannels(channels.data)
        setLoading(false);
        console.log(joinedChannelIds)
    };

    const handleJoin = async (channelId, channelName) => {
        setJoining(channelId);
    };

    const filteredChannels = channels.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase().trim())
    );

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content className="bg-card border-border fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Dialog.Close>
                <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
                    <Dialog.Title className='text-lg font-semibold leading-none tracking-tight'>Join a Channel</Dialog.Title>
                </div>

                <div className="relative flex items-center">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        placeholder="Search channels..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-secondary border-border pl-9 flex h-10 w-full rounded-md border  px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        maxLength={50}
                    />
                </div>

                <ScrollArea.Root className="relative">
                    <ScrollArea.Viewport className="h-[300px] overflow-auto">
                        {loading ? (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                Loading channels...
                            </div>
                        ) : filteredChannels.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                                <Hash className="h-8 w-8 mb-2 opacity-50" />
                                <p>No channels found</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {filteredChannels.map((channel) => {
                                    const isJoined = joinedChannelIds.has(channel.id);
                                    const isJoining = joining === channel.id;

                                    return (
                                        <div
                                            key={channel.id}
                                            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <Hash className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-foreground truncate">
                                                    {channel.name}
                                                </p>
                                                {channel.description && (
                                                    <p className="text-sm text-muted-foreground truncate">
                                                        {channel.description}
                                                    </p>
                                                )}
                                            </div>
                                            {isJoined ? (
                                                <div className="flex items-center gap-1 text-sm text-green-500">
                                                    <Check className="h-4 w-4" />
                                                    <span>Joined</span>
                                                </div>
                                            ) : (
                                                <button
                                                    size="sm"
                                                    onClick={() => handleJoin(channel.id, channel.name)}
                                                    disabled={isJoining}
                                                >
                                                    {isJoining ? 'Joining...' : 'Join'}
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical" className="w-3 p-px">
                        <ScrollArea.Thumb className="block rounded-full h-full" />
                    </ScrollArea.Scrollbar>
                </ScrollArea.Root>
            </Dialog.Content>
        </Dialog.Root>
    );
}

"use client"
import { useState } from "react";
import ChannelSidebar from "@/components/ChannelSidebar";
import ChatArea from "@/components/ChatArea";
import { useRouter } from "next/navigation";
export default function Chats() {
    // 1. Initialize with the channels shown in the image
    const [channels, setChannels] = useState([
        { id: 'general', name: 'general', is_private: false },
        { id: 'channel2', name: 'channel2', is_private: false }
    ])
    
    // 2. Set 'channel2' as active by default to match screenshot
    const [selectedChannel, setSelectedChannel] = useState(channels[1])

    // 3. Mock online users (johndoe and johndoe2)
    const [onlineUsers, setOnlineUsers] = useState([
        { id: 1, username: 'johndoe2', status: 'online' },
        { id: 2, username: 'johndoe', status: 'online' }
    ])
    
    const router = useRouter()

    return (
        <div className="h-screen flex bg-background overflow-hidden">
            <ChannelSidebar
                channels={channels}
                activeChannel={selectedChannel}
                onSelectChannel={setSelectedChannel}
                onlineUsers={onlineUsers}
            />
            <ChatArea channel={selectedChannel} />
        </div>
    )
}
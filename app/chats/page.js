"use client"
import { useState } from "react";
import ChannelSidebar from "@/components/ChannelSidebar";
import ChatArea from "@/components/ChatArea";
import { useRouter } from "next/navigation";
export default function Chats() {
    const [selectedChannel, setSelectedChannel] = useState('')
    const [channels, setChannels] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const router=useRouter()

    const fetchChannels = async () => {

    }
    const fetchOnlineUsers = async () => { 


    }
    return (
        <div className="h-screen flex bg-background">
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

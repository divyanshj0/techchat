"use client"
import { useState, useEffect } from "react";
import ChannelSidebar from "@/components/ChannelSidebar";
import ChatArea from "@/components/ChatArea";
import { useRouter } from "next/navigation";
import axios from "axios";
export default function Chats() {
    const [channels, setChannels] = useState([])
    const [selectedChannel, setSelectedChannel] = useState()
    const [token, setToken] = useState(null)
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log(token);
            alert('session expired');
            router.replace('/auth');
        }
        setToken(token)
    }, [])

    const fetchChannels = async () => {
        console.log(token)
        try {
            const res = await axios.get(`${url}/api/channels/join`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setChannels(res.data)
        }
        catch (err) {
            const status = err.response.status;
            if (status == 401) {
                alert('Session Expired!');
                router.replace('/auth');
                console.log(err.response)
            }
            else {
                alert('Error', err.response.message);
            }
        }
    }
    useEffect(() => {
        if (token) {
            fetchChannels();
        }
    }, [token]);
    return (
        <div className="h-screen flex bg-background overflow-hidden">
            <ChannelSidebar
                channels={channels}
                activeChannel={selectedChannel}
                onSelectChannel={setSelectedChannel}
                oncreateChannel={fetchChannels}
            />
            <ChatArea channel={selectedChannel} />
        </div>
    )
}
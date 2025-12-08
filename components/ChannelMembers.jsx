import { useState, useEffect } from 'react';
import { Shield, ShieldCheck, User, X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Avatar from '@radix-ui/react-avatar';
import axios from 'axios';
export function ChannelMembers({ open, onOpenChange, channel }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
  useEffect(() => {
    if (open && channel) {
      fetchMembers(); 
      setLoading(true);
    }
  }, [open, channel]);

  const fetchMembers = async () => {
    const token = localStorage.getItem('token')
    console.log(channel.id);
    try {
      const members = await axios.get(`${url}/api/members/${channel.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMembers(members.data);
      setLoading(false);
    }
    catch (err) {
      alert(err)
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="h-4 w-4 text-primary" />;
      case 'moderator':
        return <Shield className="h-4 w-4 text-warning" />;
      default:
        return <User className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="bg-card border-border fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Dialog.Close>
        <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
          <Dialog.Title className='text-lg font-semibold leading-none tracking-tight'>Channel Members ({members.length})</Dialog.Title>
        </div>
        <ScrollArea.Root className="max-h-96 relative overflow-hidden">
          <div className="space-y-2">
            {members.map((member) => (
              <div
                key={member.user_id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors "
              >
                <div className="relative">
                  <Avatar.Root className="h-10 w-10 relative flex  shrink-0 overflow-hidden rounded-full">
                    <Avatar.Fallback className="bg-secondary flex h-full w-full items-center justify-center rounded-full">
                      {member.User?.username?.charAt(0).toUpperCase() || '?'}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  {member.User?.status === 'online' && (
                    <div className="absolute -bottom-0.5 -right-0.5 presence-dot presence-online" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {member.User?.username || 'Unknown'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {member.User?.status === 'online' ? 'Online' : 'Offline'}
                  </p>
                </div>
                <div title={member.role}>
                  {getRoleIcon(member.role)}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}
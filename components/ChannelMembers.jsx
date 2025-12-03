import { useState, useEffect } from 'react';
import { Shield, ShieldCheck, User } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog'
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Avatar from '@radix-ui/react-avatar';
export function ChannelMembers({ open, onOpenChange, channel }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && channel) {
      fetchMembers();
    }
  }, [open, channel]);

  const fetchMembers = async () => {
    
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

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <Badge variant="default" className="text-xs">Admin</Badge>;
      case 'moderator':
        return <Badge variant="secondary" className="text-xs">Mod</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content className="bg-card border-border fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
          <Dialog.Title className='text-lg font-semibold leading-none tracking-tight'>Channel Members ({members.length})</Dialog.Title>
        </div>
        <ScrollArea.Root className="max-h-96 relative overflow-hidden">
          <div className="space-y-2">
            {members.map((member) => (
              <div 
                key={member.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors "
              >
                <div className="relative">
                  <Avatar.Root className="h-10 w-10 relative flex  shrink-0 overflow-hidden rounded-full">
                    <Avatar.Fallback className="bg-secondary flex h-full w-full items-center justify-center rounded-full">
                      {member.profile?.username?.charAt(0).toUpperCase() || '?'}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  {member.profile?.status === 'online' && (
                    <div className="absolute -bottom-0.5 -right-0.5 presence-dot presence-online" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">
                      {member.profile?.username || 'Unknown'}
                    </span>
                    {getRoleBadge(member.role)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {member.profile?.status === 'online' ? 'Online' : 'Offline'}
                  </p>
                </div>
                {getRoleIcon(member.role)}
              </div>
            ))}
          </div>
        </ScrollArea.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
}
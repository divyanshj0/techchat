import * as Dialog from '@radix-ui/react-dialog'
import * as Switch from '@radix-ui/react-switch'
import { X } from 'lucide-react'
import { useState } from 'react'
export default function CreateChannel({ open, onOpenChange }) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const handleCreate = async () => {
        if (!name.trim()) return;
        alert(`channel ${name} created successfully`);
    }
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Content className="bg-card border-border fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity data-[state=open]:bg-accent data-[state=open]:text-muted-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Dialog.Close>
                <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
                    <Dialog.Title className='text-lg font-semibold leading-none tracking-tight'>Create a Channel</Dialog.Title>
                </div>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className='text-sm font-medium leading-none'>Channel Name</label>
                        <input
                            id="name"
                            placeholder="e.g. general"
                            value={name}
                            onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                            className="bg-secondary  flex h-10 w-full rounded-md border border-input mt-2 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="description" className='text-sm font-medium leading-none'>Description (optional)</label>
                        <textarea
                            id="description"
                            placeholder="What's this channel about?"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-secondary  resize-none flex min-h-20 w-full rounded-md border border-input mt-2 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            rows={3}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className='text-sm font-medium leading-none'>Private Channel</label>
                            <p className="text-sm text-muted-foreground">
                                Only invited members can see and join
                            </p>
                        </div>
                        <Switch.Root
                            checked={isPrivate}
                            onCheckedChange={setIsPrivate}
                            className='peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                        >
                            <Switch.Thumb className='pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'/>
                        </Switch.Root>
                    </div>
                </div>
                <div className="flex justify-end gap-3">
                    <button className='hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors' onClick={() => onOpenChange(false)}>
                        Cancel
                    </button>
                    <button onClick={handleCreate} disabled={!name.trim()} className='bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
                        Create channel
                    </button>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    )

}
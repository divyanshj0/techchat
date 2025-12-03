"use client"
import {useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Loader2 } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
export default function Auth() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ email: '', password: '', username: '' });
    const router=useRouter()
    const handleLogin=async (e)=>{
        e.preventDefault()
        alert(`sign in using ${loginData.email} and ${loginData.password}`);
        router.back()
    }
    const handleSignup=async (e)=>{
        e.preventDefault()
        alert(`signup using ${signupData.email} and ${signupData.password}`);
        router.back()
    }
    return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-3xl" />
      </div>
      
      <div className="rounded-lg border text-card-foreground shadow-sm w-full max-w-md bg-card/80 backdrop-blur-xl border-border relative z-10 ">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4 glow-effect">
            <MessageSquare className="h-8 w-8 text-primary-foreground" />
          </div>
          <p className="text-2xl font-bold leading-none tracking-tight">TechChat</p>
          <p className='text-sm text-muted-foreground'>
            Real-time team communication platform
          </p>
        </div>
        <div className='p-6 pt-0'>
          <Tabs.Root defaultValue="login" className="w-full">
            <Tabs.List className="grid w-full grid-cols-2 h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <Tabs.Trigger value="login" className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'>Sign In</Tabs.Trigger>
              <Tabs.Trigger value="signup" className='inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm'>Sign Up</Tabs.Trigger>
            </Tabs.List>
            
            <Tabs.Content value="login" className='mt-2'>
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div>
                  <label htmlFor="login-email" className='text-sm font-medium leading-none'>Email</label>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="flex h-10 w-full rounded-md border mt-2 px-3 py-2 text-base ring-offset-background file:border-0 bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  border-input"
                  />
                </div>
                <div>
                  <label htmlFor="login-password" className='text-sm font-medium leading-none'>Password</label>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="bg-secondary flex h-10 w-full rounded-md border border-input mt-2 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
                <button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 hover:cursor-pointer">
                  Sign In
                </button>
              </form>
            </Tabs.Content>
            
            <Tabs.Content value="signup" className='mt-2'>
              <form onSubmit={handleSignup} className="space-y-4 mt-4">
                <div>
                  <label htmlFor="signup-username" className='text-sm font-medium leading-none'>Username</label>
                  <input
                    id="signup-username"
                    type="text"
                    placeholder="johndoe"
                    value={signupData.username}
                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                    className="bg-secondary flex h-10 w-full rounded-md border border-input mt-2 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="signup-email" className='text-sm font-medium leading-none'>Email</label>
                  <input
                    id="signup-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="bg-secondary flex h-10 w-full rounded-md border border-input mt-2 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="signup-password" className='text-sm font-medium leading-none'>Password</label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="bg-secondary flex h-10 w-full rounded-md border border-input mt-2 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
                <button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 hover:cursor-pointer">
                  Create Account
                </button>
              </form>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
    )
}

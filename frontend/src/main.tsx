// src/index.tsx

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from './lib/trpc'; // make sure this path matches your structure

const queryClient = new QueryClient();

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key')
}



createRoot(document.getElementById('root')!).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>

                <App />
            </QueryClientProvider>
        </trpc.Provider>
    </ClerkProvider>
);

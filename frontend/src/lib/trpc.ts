import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '../trpc-types';

export const trpc = createTRPCReact<AppRouter>();

const apiUrl = import.meta.env.VITE_API_URL || 'https://smartledger-backend.vercel.app/trpc';
console.log('tRPC Client connecting to:', apiUrl);

export const trpcClient = trpc.createClient({
    transformer: superjson,
    links: [
        httpBatchLink({
            url: apiUrl,
        }),
    ],
});

import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '../trpc-types';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
    transformer: superjson,
    links: [
        httpBatchLink({
            url: import.meta.env.VITE_API_URL || 'http://localhost:3001/trpc',
        }),
    ],
});

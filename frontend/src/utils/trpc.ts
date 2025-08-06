// src/utils/trpc.ts
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../smartledger-backend/src/router/index.js'; // Adjust the import path

export const trpc = createTRPCReact<AppRouter>();

// src/trpc-types.ts
import type { inferRouterOutputs, inferRouterInputs } from '@trpc/server';
import type { AppRouter as BackendRouter } from '../smartledger-backend/src/router/index.js';

export type AppRouter = BackendRouter;

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>; 
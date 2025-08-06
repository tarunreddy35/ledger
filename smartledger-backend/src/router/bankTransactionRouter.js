import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { publicProcedure, router } from "./trpc.js";

export const bankTransactionRouter = router({
    getAll: publicProcedure.query(() => prisma.bankTransaction.findMany()),

    create: publicProcedure
        .input(
            z.object({
                statementId: z.string(),
                date: z.string(),
                description: z.string(),
                amount: z.number(),
                balance: z.number().optional(),
                source: z.string(),
                confidence: z.number().optional(),
            })
        )
        .mutation(({ input }) =>
            prisma.bankTransaction.create({
                data: {
                    ...input,
                    date: new Date(input.date),
                },
            })
        ),
});

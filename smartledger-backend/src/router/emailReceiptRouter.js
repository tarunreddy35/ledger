import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { publicProcedure, router } from "./trpc.js";

export const emailReceiptRouter = router({
    getAll: publicProcedure.query(() => prisma.emailReceipt.findMany()),

    create: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                subject: z.string(),
                date: z.string(),
                amount: z.number(),
                vendor: z.string(),
                status: z.string(),
                confidence: z.number(),
            })
        )
        .mutation(({ input }) =>
            prisma.emailReceipt.create({
                data: {
                    ...input,
                    date: new Date(input.date),
                },
            })
        ),
});

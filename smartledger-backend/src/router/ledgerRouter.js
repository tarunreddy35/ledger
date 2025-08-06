import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { publicProcedure, router } from "./trpc.js";

export const ledgerRouter = router({
    getAll: publicProcedure.query(() =>
        prisma.ledgerEntry.findMany({ orderBy: { date: "desc" } })
    ),

    getById: publicProcedure.input(z.string()).query(({ input }) =>
        prisma.ledgerEntry.findUnique({ where: { id: input } })
    ),

    create: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                date: z.string(),
                description: z.string(),
                amount: z.number(),
                vendor: z.string(),
                source: z.string(),
                status: z.enum(["MATCHED", "UNMATCHED", "PENDING"]).optional(),
            })
        )
        .mutation(({ input }) =>
            prisma.ledgerEntry.create({
                data: {
                    ...input,
                    date: new Date(input.date),
                },
            })
        ),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                data: z.object({
                    description: z.string().optional(),
                    amount: z.number().optional(),
                    vendor: z.string().optional(),
                    status: z.enum(["MATCHED", "UNMATCHED", "PENDING"]).optional(),
                }),
            })
        )
        .mutation(({ input }) =>
            prisma.ledgerEntry.update({
                where: { id: input.id },
                data: input.data,
            })
        ),

    delete: publicProcedure.input(z.string()).mutation(({ input }) =>
        prisma.ledgerEntry.delete({ where: { id: input } })
    ),

});

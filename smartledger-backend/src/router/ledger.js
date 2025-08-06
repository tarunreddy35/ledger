import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ledgerRouter = router({
    // 🟢 Get all ledger entries
    getAll: publicProcedure.query(async () => {
        const entries = await prisma.ledgerEntry.findMany({
            orderBy: { date: "desc" },
        });
        return { json: entries };
    }),

    // 🟢 Add a single ledger entry (used manually or for individual input)
    add: publicProcedure
        .input(
            z.object({
                date: z.string(), // will convert to Date
                description: z.string(),
                amount: z.number(),
                balance: z.number(),
                source: z.enum(["csv", "email", "manual"]),
                status: z.enum(["pending", "matched", "unmatched"]).optional().default("pending"),
            })
        )
        .mutation(async ({ input }) => {
            const entry = await prisma.ledgerEntry.create({
                data: {
                    ...input,
                    date: new Date(input.date),
                },
            });
            return entry;
        }),

    // 🆕 Add multiple entries (for CSV bulk upload)
    addMany: publicProcedure
        .input(
            z.array(
                z.object({
                    date: z.string(),
                    description: z.string(),
                    amount: z.number(),
                    balance: z.number(),
                    source: z.enum(["csv", "email", "manual"]),
                    status: z.enum(["pending", "matched", "unmatched"]).optional().default("pending"),
                })
            )
        )
        .mutation(async ({ input }) => {
            const data = input.map((entry) => ({
                ...entry,
                date: new Date(entry.date),
            }));

            const result = await prisma.ledgerEntry.createMany({
                data,
            });

            return { count: result.count };
        }),

    // 🔟 Get latest 10 ledger entries
    ledger: publicProcedure.query(async () => {
        const latest = await prisma.ledgerEntry.findMany({
            orderBy: { date: "desc" },
            take: 10,
        });
        return { json: latest };
    }),

    // ❌ Delete a ledger entry by ID
    delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
        const deleted = await prisma.ledgerEntry.delete({
            where: { id: input },
        });
        return deleted;
    }),
});

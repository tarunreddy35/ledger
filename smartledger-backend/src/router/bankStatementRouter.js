import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { publicProcedure, router } from "./trpc.js";

export const bankStatementRouter = router({
    getAll: publicProcedure.query(() => prisma.bankStatement.findMany()),

    create: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                name: z.string(),
                rows: z.number(),
                status: z.string(),
                uploadDate: z.string(),
            })
        )
        .mutation(({ input }) =>
            prisma.bankStatement.create({
                data: {
                    ...input,
                    uploadDate: new Date(input.uploadDate),
                },
            })
        ),
});

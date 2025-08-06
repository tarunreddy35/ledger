import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { publicProcedure, router } from "./trpc.js";

export const userRouter = router({
    getAll: publicProcedure.query(() => prisma.user.findMany()),

    create: publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                name: z.string().optional(),
            })
        )
        .mutation(({ input }) => prisma.user.create({ data: input })),
});

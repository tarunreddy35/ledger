// router/summary.ts
import { router, publicProcedure } from "./trpc.js";
import { prisma } from "../lib/prisma.js";

export const summaryRouter = router({
    getSummary: publicProcedure.query(async () => {
        const totalMatched = await prisma.ledgerEntry.count({
            where: { status: "MATCHED" },
        });

        const onlyInLedger = await prisma.ledgerEntry.count({
            where: { status: "UNMATCHED" },
        });

        const onlyInBank = await prisma.bankTransaction.count({
            where: { matchedLedgerId: null },
        });

        const totalEntries = totalMatched + onlyInLedger + onlyInBank;
        const matchRate = totalEntries > 0 ? (totalMatched / totalEntries) * 100 : 0;

        return {
            totalMatched,
            onlyInLedger,
            onlyInBank,
            matchRate,
            changeData: {
                totalMatchedChange: 12.3,
                onlyInLedgerChange: -4.2,
                onlyInBankChange: 2.1,
                matchRateChange: 1.5,
            },
        };
    }),
});


import { router } from "./trpc.js";
import { userRouter } from "./userRouter.js";
import { ledgerRouter } from "./ledgerRouter.js";
import { bankStatementRouter } from "./bankStatementRouter.js";
import { bankTransactionRouter } from "./bankTransactionRouter.js";
import { emailReceiptRouter } from "./emailReceiptRouter.js";
import { summaryRouter } from "./summary.js";

export const appRouter = router({
    user: userRouter,
    ledger: ledgerRouter,
    bankStatement: bankStatementRouter,
    bankTransaction: bankTransactionRouter,
    emailReceipt: emailReceiptRouter,
    summary: summaryRouter,
});

